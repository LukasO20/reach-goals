import { useEffect, useState, useCallback } from 'react'

import { useVisibility } from '../../../../provider/VisibilityProvider.jsx'
import { useManageModel } from '../../../../provider/ManageModelProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap, resetManageModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import Form from '../../items/forms/Form.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelRelationAdd from '../../items/forms/ModelRelationAdd.jsx'

import './ModalForm.scss'

const modelRelationAddMap = (type, children) => {
    return <ModelRelationAdd type={type}>{children}</ModelRelationAdd>
}

const ModalForm = () => {
    const { modal: { data: dataAssignment, loading: loadingAssigment }, save: saveAssignment, saveSuccess: saveAssignmentSuccess, saving: savingAssignment, resetSave: resetSaveAssignment } = useAssignmentProvider()
    const { modal: { data: dataGoal, loading: loadingGoal }, save: saveGoal, saveSuccess: saveGoalSuccess, saving: savingGoal, resetSave: resetSaveGoal } = useGoalProvider()
    const { modal: { data: dataTag }, loading: loadingTag, save: saveTag, saveSuccess: saveTagSuccess, saving: savingTag, resetSave: resetSaveTag } = useTagProvider()
    const { visibleElements, toggleVisibility } = useVisibility()
    const { model, setModel, updateFilterModel, resetManageModel } = useManageModel()
    const { update } = useTitle()
    const [error, setError] = useState(null)

    const typeVisibility = visibleElements[1]

    const isLoading = !!loadingGoal || !!loadingAssigment || !!loadingTag
    const isSaving = !!savingGoal || !!savingAssignment || !!savingTag
    const isModalModelList = visibleElements.some(
        classItem => classItem === 'modal-model-list-goal' ||
            classItem === 'modal-model-list-assignment' ||
            classItem === 'modal-model-list-tag')

    const isSaveSuccess = !!saveGoalSuccess || !!saveAssignmentSuccess || !!saveTagSuccess

    const loadModel = useCallback((id) => {
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
            const dataFilter = updateFilterModelMap({ filter: filterGetModel, model: typeVisibility, scope: 'modal' })

            const refetchMap = {
                goal: () => updateFilterModel(dataFilter),
                assignment: () => updateFilterModel(dataFilter),
                tag: () => updateFilterModel(dataFilter),
            }

            refetchMap[typeVisibility]()

            id === 'all' && resetManageModel()
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
    }, [resetManageModel, typeVisibility, updateFilterModel])

    const resetMutation = useCallback(() => {
        const resetSaveMap = {
            goal: () => resetSaveGoal(),
            assignment: () => resetSaveAssignment(),
            tag: () => resetSaveTag(),
        }
        resetSaveMap[typeVisibility]()
    }, [resetSaveGoal, resetSaveAssignment, resetSaveTag, typeVisibility])

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

    const functionFormMap = {
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapModelRelationAddMap: modelRelationAddMap,
        mapHandleSubmit: handleSubmit,
        mapSetError: setError
    }

    useEffect(() => {
        if (typeof model.mainModelID === 'number') loadModel(model.mainModelID)
    }, [model.mainModelID, loadModel])

    useEffect(() => {
        if (isSaveSuccess) {
            const visibility = typeVisibility === 'tag'
                ? visibilityMap('near-modalForm', { remove: true })
                : visibilityMap(['modal-center', typeVisibility], { remove: true })

            toggleVisibility(visibility)
            const resetKeys = resetManageModelMap(['formModel', 'mainModelID', 'typeModel'])
            resetManageModel(resetKeys)
            resetMutation()
        }
    }, [isSaveSuccess, toggleVisibility, typeVisibility, resetManageModel, resetMutation])

    useEffect(() => {
        const currentScope = model.filter[typeVisibility]?.scope
        if (!currentScope) return

        const currentFilter = model.filter[typeVisibility][currentScope]
        if (typeof model.mainModelID === 'number' && currentFilter.source === 'formModel') {
            const typeSelected =
                typeVisibility === 'goal' ?
                    dataGoal :
                    typeVisibility === 'assignment' ?
                        dataAssignment :
                        typeVisibility === 'tag' ?
                            dataTag : null

            const selectedFormModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
            if (selectedFormModel && Object.keys(selectedFormModel).length) {
                setModel(prevModel => ({
                    ...prevModel,
                    formModel: selectedFormModel
                }))
            }
        }
    }, [dataGoal,
        dataAssignment,
        dataTag,
        model.filter,
        model.mainModelID,
        typeVisibility,
        setModel])

    return (
        isLoading && !isModalModelList ? (
            <Loading mode='block' />
        ) : (
            <Form
                typeForm={typeVisibility}
                functionFormMap={functionFormMap}
                model={model.formModel}
                pendingState={isSaving}
            />
        )
    )
}

export default ModalForm