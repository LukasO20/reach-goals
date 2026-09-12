import { useEffect, useState, useCallback } from 'react'

import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'

import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useTagProvider } from '../../../provider/model/tag-model-provider'
import { useTitle } from '../../../provider/ui/title-provider'

import { visibilityMap } from '../../../utils/mapping/mapping-utils.js'
import { resetManageModelMap } from '../../../utils/mapping/mapping-utils-provider.js'

import Form from '../../forms'
import Loading from '../../elements/loading'
import FormModelRelationAdd from '../../forms/components/form-model-relation-add'

import './style.scss'

const modelRelationAddMap = (type, children) => {
    return <FormModelRelationAdd type={type}>{children}</FormModelRelationAdd>
}

const ModalForm = () => {
    const {
        modal: { data: dataAssignment, loading: loadingAssigment },
        save: saveAssignment,
        saveSuccess: saveAssignmentSuccess,
        saving: savingAssignment,
        resetSave: resetSaveAssignment,
    } = useAssignmentProvider()
    const {
        modal: { data: dataGoal, loading: loadingGoal },
        save: saveGoal,
        saveSuccess: saveGoalSuccess,
        saving: savingGoal,
        resetSave: resetSaveGoal,
    } = useGoalProvider()
    const {
        modal: { data: dataTag },
        loading: loadingTag,
        save: saveTag,
        saveSuccess: saveTagSuccess,
        saving: savingTag,
        resetSave: resetSaveTag,
    } = useTagProvider()
    const { visibleElements, toggleVisibility } = useVisibility()
    const { model, setModel, resetManageModel } = useManageModel()
    const { update } = useTitle()
    const [error, setError] = useState(null)

    const typeVisibility = visibleElements[1]

    const isLoading = !!loadingGoal || !!loadingAssigment || !!loadingTag
    const isSaving = !!savingGoal || !!savingAssignment || !!savingTag
    const isModalModelList = visibleElements.some(
        (classItem) =>
            classItem === 'modal-model-list-goal' ||
            classItem === 'modal-model-list-assignment' ||
            classItem === 'modal-model-list-tag'
    )

    const isSaveSuccess =
        !!saveGoalSuccess || !!saveAssignmentSuccess || !!saveTagSuccess

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

        const tagsRelation = e.tags ?? model.activeModel?.tags ?? []

        if (typeVisibility === 'goal') {
            const assignmentsRelation =
                e.assignments ?? model.activeModel?.assignments ?? []

            const update = {
                ...model.activeModel,
                [name]: value,
                assignments: [...assignmentsRelation],
                tags: [...tagsRelation],
            }

            setModel((prevModel) => ({
                ...prevModel,
                activeModel: update,
            }))
        } else if (typeVisibility === 'assignment') {
            const update = {
                ...model.activeModel,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation],
            }

            setModel((prevModel) => ({
                ...prevModel,
                activeModel: update,
            }))
        } else {
            const update = {
                ...model.activeModel,
                [name]: value,
            }

            setModel((prevModel) => ({
                ...prevModel,
                activeModel: update,
            }))
        }
    }

    const handleSubmit = async () => {
        setError(null)

        try {
            typeVisibility === 'goal' &&
                saveGoal(structuredClone(model.activeModel))
            typeVisibility === 'assignment' &&
                saveAssignment(structuredClone(model.activeModel))
            typeVisibility === 'tag' &&
                saveTag(structuredClone(model.activeModel))
        } catch (exception) {
            setError(exception.message)
            update({
                toast: 'Ops something went wrong during save. Reload page and try again later.',
            })
            console.error(`Error during save: ${error}`)
        }
    }

    const functionFormMap = {
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapModelRelationAddMap: modelRelationAddMap,
        mapHandleSubmit: handleSubmit,
        mapSetError: setError,
    }

    useEffect(() => {
        if (isSaveSuccess) {
            const visibility =
                typeVisibility === 'tag'
                    ? visibilityMap('near-modalForm', { remove: true })
                    : visibilityMap(['modal-center', typeVisibility], {
                          remove: true,
                      })

            toggleVisibility(visibility)
            const resetKeys = resetManageModelMap([
                'activeModel',
                'mainModelID',
                'typeModel',
            ])
            resetManageModel(resetKeys)
            resetMutation()
        }
    }, [
        isSaveSuccess,
        toggleVisibility,
        typeVisibility,
        resetManageModel,
        resetMutation,
    ])

    useEffect(() => {
        if (typeof model.mainModelID === 'string' && !!model.typeModel) {
            const data =
                model.typeModel === 'goal'
                    ? dataGoal
                    : model.typeModel === 'assignment'
                      ? dataAssignment
                      : model.typeModel === 'tag'
                        ? dataTag
                        : null

            const selectedModel = Array.isArray(data) ? data[0] : data
            if (selectedModel && Object.keys(selectedModel).length) {
                setModel((prevModel) => ({
                    ...prevModel,
                    activeModel: selectedModel,
                }))
            }
        }
    }, [
        dataGoal,
        dataAssignment,
        dataTag,
        model.typeModel,
        model.mainModelID,
        setModel,
    ])

    return isLoading && !isModalModelList ? (
        <div className='container-form-modal'>
            <Loading mode='block' />
        </div>
    ) : (
        <Form
            typeForm={typeVisibility}
            functionFormMap={functionFormMap}
            model={model}
            modelForm={model.activeModel}
            mainModelID={model.mainModelID}
            pendingState={isSaving}
        />
    )
}

export default ModalForm
