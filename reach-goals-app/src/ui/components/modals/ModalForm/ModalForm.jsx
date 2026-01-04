import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import Form from '../../items/forms/Form.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelRelationAdd from '../../items/forms/ModelRelationAdd.jsx'

import './ModalForm.scss'

const modelRelationAddMap = (type, children) => {
    return <ModelRelationAdd type={type} children={children} />
}

const ModalForm = () => {
    const { panel: { data: dataAssignment, loading: loadingAssigment }, save: saveAssignment, saveSuccess: saveAssignmentSuccess, saving: savingAssignment } = useAssignmentProvider()
    const { panel: { data: dataGoal, loading: loadingGoal }, save: saveGoal, saveSuccess: saveGoalSuccess, saving: savingGoal } = useGoalProvider()
    const { save: saveTag, saveSuccess: saveTagSuccess, saving: savingTag } = useTagProvider()
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFilterModel, resetManageModel } = useContext(ManageModelContext)
    const { update } = useTitle()
    const [error, setError] = useState(null)

    const typeVisibility = visibleElements[1]

    const loadModel = (id) => {
        if (!id) return

        const keySomeID = `${typeVisibility}SomeID`
        const filterGetModel = {
            type: typeVisibility,
            source: 'formModel',
            [keySomeID]: id
        }

        const isValidParameters = !filterGetModel
        if (isValidParameters) return

        try {
            const refetchMap = {
                goal: () => updateFilterModel(filterGetModel, 'goal', 'panel'),
                assignment: () => updateFilterModel(filterGetModel, 'assignment', 'panel'),
                tag: () => updateFilterModel(filterGetModel, 'tag'),
            }

            refetchMap[typeVisibility]()

            id === 'all' && resetManageModel()
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target || e

        //Tag attributes
        const tagsRelation = e.tags ?? model.formModel.tags ?? []

        if (typeVisibility === 'goal') {
            const assignmentsRelation = e.assignments ?? model.formModel.assignments ?? []

            const update = {
                ...model.formModel,
                [name]: value,
                assignments: [...assignmentsRelation],
                tags: [...tagsRelation]
            }

            setModel(prevModel => ({
                ...prevModel,
                formModel: update
            }))
        } else if (typeVisibility === 'assignment') {

            const update = {
                ...model.formModel,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation]
            }

            setModel(prevModel => ({
                ...prevModel,
                formModel: update
            }))
        } else {

            const update = {
                ...model.formModel,
                [name]: value
            }

            setModel(prevModel => ({
                ...prevModel,
                formModel: update
            }))
        }
    }

    const handleSubmit = async () => {
        setError(null)

        try {
            typeVisibility === 'goal' && await saveGoal(structuredClone(model.formModel))
            typeVisibility === 'assignment' && await saveAssignment(structuredClone(model.formModel))
            typeVisibility === 'tag' && await saveTag(structuredClone(model.formModel))
        } catch (exception) {
            setError(exception.message)
            update({ toast: "Ops something went wrong during save. Reload page and try again later." })
            console.error(`Error during save: ${error}`)
        }
    }

    const getToastMessage = () => {
        const messageToastSupport = typeof model.formModel.id === 'number' ? 'updated' : 'created'
        const type = saveGoalSuccess ? 'Goal' : saveAssignmentSuccess ? 'Assignment' : 'Tag'
        return `${type} ${messageToastSupport} with success`
    }

    const functionFormMap = {
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapModelRelationAddMap: modelRelationAddMap,
        mapHandleSubmit: handleSubmit,
        mapSetError: setError
    }

    const booleanFormMap = {
        mapClassRemove: visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    }

    const isSaving = !!savingGoal || !!savingAssignment || !!savingTag

    const isModalList = visibleElements.some(
        classItem => classItem === 'modal-list-goal' ||
            classItem === 'modal-list-assignment' ||
            classItem === 'modal-list-tag')

    useEffect(() => {
        if (typeof model.mainModelID === 'number') loadModel(model.mainModelID)
    }, [model.mainModelID])

    useEffect(() => {
        if (saveGoalSuccess || saveAssignmentSuccess || saveTagSuccess) {
            update({ toast: getToastMessage() })

            if (!isSaving) {
                const visibilityTag = typeVisibility === 'tag' ? visibilityMap('near-modalForm', { remove: true }) : null
                toggleVisibility(visibilityTag)
            }
        }
    }, [saveGoalSuccess, saveAssignmentSuccess, saveTagSuccess])

    useEffect(() => {
        const currentScope = model.filter[typeVisibility]?.scope
        if (!currentScope) return

        const currentFilter = model.filter[typeVisibility][currentScope]
        if (typeof model.mainModelID === 'number' && currentFilter.source === 'formModel') {
            const typeSelected =
                typeVisibility === 'goal' ?
                    dataGoal :
                    typeVisibility === 'assignment' ?
                        dataAssignment : null

            const selectedFormModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
            if (selectedFormModel && Object.keys(selectedFormModel).length) {
                setModel(prevModel => ({
                    ...prevModel,
                    formModel: selectedFormModel
                }))
            }
        }
    }, [dataGoal, dataAssignment])

    return (
        (loadingGoal || loadingAssigment) && !isModalList ?
            <Loading mode='block' /> :
            <Form typeForm={typeVisibility} functionFormMap={functionFormMap}
                model={model.formModel} booleanFormMap={booleanFormMap} pendingState={isSaving} />
    )
}

export default ModalForm