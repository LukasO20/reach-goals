import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../provider/ManageModelProvider.jsx'
import { ModalListContext } from '../../../provider/ModalListProvider.jsx'

import { useGoalModel } from '../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentModel } from '../../../provider/model/AssignmentModelProvider.jsx'
import { useTagModel } from '../../../provider/model/TagModelProvider.jsx'

import { modalListMap } from '../../../utils/mapping/mappingUtils.js'
import { formatDate } from '../../../utils/utils.js'

import ButtonAction from '../items/elements/ButtonAction.jsx'
import Form from '../items/forms/Form.jsx'

import '../../styles/items/Elements.scss'
import '../../styles/panels/Objectives.scss'

const formsInputMap = (typeForm, model, exFunction) => {
    const form = typeForm === 'assignment' &&
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} value={model?.duration} />
        </div>

    return form
}

const formsItemMap = (typeForm, modelComponent) => {
    const messageRelation = typeForm === 'goal' ? 'assignments' : 'goals'

    const formItem =
        <div className={`item-forms ${typeForm === 'goal' ? 'assignment' : 'goal'}`}>
            <div className='item-forms head'>
                <div className='item-head-1'>
                    <label>{messageRelation}</label>
                    <ButtonAction modalList={modalListMap(true, typeForm)} classBtn={`form-modallist-${typeForm} button-st`} iconFa='fa-solid fa-plus' title='Add' />
                </div>
                <div className='item-head-2'></div>
            </div>
            <div className='item-forms body'>
                {modelComponent}
            </div>
        </div>

    return formItem
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, resetManageModel } = useContext(ManageModelContext)
    const { modalList, handleModalList } = useContext(ModalListContext)

    const { selected: selectedAssignment, refetch: refetchAssignment, save: saveAssignment } = useAssignmentModel()
    const { selected: selectedGoal, refetch: refetchGoal, save: saveGoal } = useGoalModel()
    const { selected: selectedTag, refetch: refetchTag, save: saveTag } = useTagModel()

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    const currentKeySomeID = `${typeForm}SomeID`

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const loadModel = async (id) => {
        setLoading(true)
        if (!id) return setLoading(false)

        const currentUseGetModel = {
            type: typeForm,
            [currentKeySomeID]: id
        }

        try {
            const refetchFn =
                typeForm === 'goal'
                    ? () => refetchGoal(currentUseGetModel)
                    : typeForm === 'assignment'
                        ? () => refetchAssignment(currentUseGetModel)
                        : () => refetchTag(currentUseGetModel)

            await refetchFn()
            id === true && resetManageModel()
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target || e

        //Tag attributes
        const tagsRelation = e.tags ?? model.submitModel.tags ?? []

        if (typeForm === 'goal') {
            const assignmentsRelation = e.assignments ?? model.submitModel.assignments ?? []

            const update = {
                ...model.submitModel,
                [name]: value,
                assignments: [...assignmentsRelation],
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: formatted
            }))
        } else if (typeForm === 'assignment') {

            const update = {
                ...model.submitModel,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: formatted
            }))
        } else {

            const update = {
                ...model.submitModel,
                [name]: value
            }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: update
            }))
        }
    }

    const handleSubmit = async () => {
        setError(null)
        setSucess(false)

        try {
            typeForm === 'goal' && await saveGoal(structuredClone(model.submitModel))
            typeForm === 'assignment' && await saveAssignment(structuredClone(model.submitModel))
            typeForm === 'tag' && await saveTag(structuredClone(model.submitModel))

            loadModel(true)
            toggleVisibility(null)
            setSucess(true)

        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        const typeSelected =
            typeForm === 'goal' ?
                selectedGoal :
                typeForm === 'assignment' ?
                    selectedAssignment : null

        const selectedSubmitModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
        if (selectedSubmitModel && Object.keys(selectedSubmitModel).length) {
            setModel(prevModel => ({
                ...prevModel,
                submitModel: selectedSubmitModel
            }))
        }
    }, [selectedGoal, selectedAssignment, selectedTag])

    useEffect(() => {
        if (typeof model.mainModelID === 'number') loadModel(model.mainModelID)
    }, [model.mainModelID])

    const functionFormMap = {
        mapHandleModalList: handleModalList,
        mapModalListMap: modalListMap,
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapFormsInputMap: formsInputMap,
        mapFormsItemMap: formsItemMap,
        mapHandleSubmit: handleSubmit,
        mapSetSucess: setSucess,
        mapSetError: setError
    }

    const booleanFormMap = {
        mapClassRemove: classRemove
    }

    const contextFormMap = {
        mapModalList: modalList,
    }

    const stateFormMap = {
        mapStateSuccess: success,
        mapStateError: error
    }

    return (
        isLoading ? <div id="load-element" className='loading-animation'></div> :
            ((model.submitModel && model.submitModel.id) || model.mainModelID === null) ?
                (
                    <Form typeForm={typeForm} functionFormMap={functionFormMap}
                        model={model.submitModel} booleanFormMap={booleanFormMap}
                        contextFormMap={contextFormMap} stateFormMap={stateFormMap} />
                )
                :
                null
    )
}

export default ModalForm