import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { targetMap } from '../../../../utils/mapping/mappingUtils.js'

import Form from '../../items/forms/Form.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelRelationAdd from '../../items/forms/ModelRelationAdd.jsx'

const modelRelationAddMap = (type, children) => {
    return <ModelRelationAdd type={type} children={children} />
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFilterModel, resetManageModel } = useContext(ManageModelContext)
    const { update } = useTitle()

    const { panel: { data: dataAssignment, loading: loadingAssigment }, save: saveAssignment, saveSuccess: saveAssignmentSuccess } = useAssignmentProvider()
    const { panel: { data: dataGoal, loading: loadingGoal }, save: saveGoal, saveSuccess: saveGoalSuccess } = useGoalProvider()
    const { save: saveTag, saveSuccess: saveTagSuccess } = useTagProvider()

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    const isModalList = visibleElements.some(
        classItem => classItem === 'modal-list-goal' ||
            classItem === 'modal-list-assignment' ||
            classItem === 'modal-list-tag')

    const [error, setError] = useState(null)

    const callRefetch = (filter, scope) => {
        const isValidParameters = typeof typeForm !== 'string' || !filter || (typeof scope !== 'string' && scope !== '')
        if (isValidParameters) return

        const refetchMap = {
            goal: () => updateFilterModel(filter, 'goal', scope),
            assignment: () => updateFilterModel(filter, 'assignment', scope),
            tag: () => updateFilterModel(filter, 'tag'),
        }

        refetchMap[typeForm]()
    }

    const loadModel = (id) => {
        if (!id) return

        const keySomeID = `${typeForm}SomeID`
        const filterGetModel = {
            type: typeForm,
            source: 'formModel',
            [keySomeID]: id
        }

        try {
            callRefetch(filterGetModel, 'panel')
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

        if (typeForm === 'goal') {
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
        } else if (typeForm === 'assignment') {

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
            typeForm === 'goal' && await saveGoal(structuredClone(model.formModel))
            typeForm === 'assignment' && await saveAssignment(structuredClone(model.formModel))
            typeForm === 'tag' && await saveTag(structuredClone(model.formModel))

            const visibilityTag = typeForm === 'tag' ? targetMap('near-modalForm', { remove: true }) : null
            toggleVisibility(visibilityTag)

        } catch (exception) {
            setError(exception.message)
            update({ toast: "Ops something went wrong during save. Reload page and try again later." })
            console.error(`Error during save: ${error}`)
        }
    }

    useEffect(() => {
        const currentScope = model.filter[typeForm]?.scope
        if (!currentScope) return

        const currentFilter = model.filter[typeForm][currentScope]
        if (typeof model.mainModelID === 'number' && currentFilter.source === 'formModel') {
            const typeSelected =
                typeForm === 'goal' ?
                    dataGoal :
                    typeForm === 'assignment' ?
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

    useEffect(() => {
        if (typeof model.mainModelID === 'number') loadModel(model.mainModelID)
    }, [model.mainModelID])

    useEffect(() => {
        if (saveGoalSuccess || saveAssignmentSuccess || saveTagSuccess) {
            const messageToastSupport = typeof model.formModel.id === 'number' ? 'updated' : 'created'
            const type = saveGoalSuccess ? 'Goal' : saveAssignmentSuccess ? 'Assignment' : 'Tag'

            update({ toast: `${type} ${messageToastSupport} with success` })
        }
    }, [saveGoalSuccess, saveAssignmentSuccess, saveTagSuccess])

    const functionFormMap = {
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapModelRelationAddMap: modelRelationAddMap,
        mapHandleSubmit: handleSubmit,
        mapSetError: setError
    }

    const booleanFormMap = {
        mapClassRemove: classRemove
    }

    return (
        (loadingGoal || loadingAssigment) && !isModalList ?
            <Loading /> :
            <Form typeForm={typeForm} functionFormMap={functionFormMap}
                model={model.formModel} booleanFormMap={booleanFormMap} />
    )
}

export default ModalForm