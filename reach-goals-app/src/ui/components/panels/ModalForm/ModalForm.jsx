import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { ModalListContext } from '../../../../provider/ModalListProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagModel } from '../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { filterGetModelMap, iconMap, modalListMap, targetMap } from '../../../../utils/mapping/mappingUtils.js'
import { formatDate } from '../../../../utils/utils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Form from '../../items/forms/Form/Form.jsx'

const formsInputMap = (typeForm, model, exFunction) => {
    const form = typeForm === 'assignment' &&
        <div className='field-forms duration'>
            <label>{iconMap['clock']}<span>duration</span></label>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} value={model?.duration} />
        </div>

    return form
}

const formsItemMap = (typeForm, modelComponent) => {
    const messageRelation = typeForm === 'goal' ? 'assignments' : 'goals'

    const formItem =
        <div className={`item-forms ${typeForm === 'goal' ? 'assignment' : 'goal'}`}>
            <div className='head'>
                <div className='item-head-1'>
                    <label>{iconMap[typeForm === 'goal' ? 'assignment' : 'goal']}{messageRelation}</label>
                    <ButtonAction modalList={modalListMap(true, typeForm)} classBtn={`form-modallist-${typeForm} button-action plan-round add max-width small`} icon='plus' title='Add' />
                </div>
                <div className='item-head-2'></div>
            </div>
            <div className='body'>
                {modelComponent}
            </div>
        </div>

    return formItem
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFilterModel, resetManageModel } = useContext(ManageModelContext)
    const { modalList, handleModalList } = useContext(ModalListContext)
    const { update } = useTitle()

    const { data: dataAssignment, refetch: refetchAssignment, save: saveAssignment } = useAssignmentProvider()
    const { data: dataGoal, refetch: refetchGoal, save: saveGoal } = useGoalProvider()
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

        const filterGetModel = {
            [currentKeySomeID]: id,
            type: typeForm,
            source: 'selected'
        }

        try {
            const refetchFn =
                typeForm === 'goal'
                    ? () => refetchGoal(updateFilterModel(filterGetModel, 'goal'))
                    : typeForm === 'assignment'
                        ? () => refetchAssignment(updateFilterModel(filterGetModel, 'assignment'))
                        : () => refetchTag(filterGetModel)

            refetchFn()
            id === 'all' && resetManageModel()
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

            const visibilityTag = typeForm === 'tag' ? targetMap('near-modalForm', { remove: true }) : null
            const messageToastSupport = typeof model.submitModel.id === 'number' ? 'updated' : 'created'

            toggleVisibility(visibilityTag)
            update({ toast: `${typeForm} ${messageToastSupport} with success` })

            resetManageModel()
            setSucess(true)
        } catch (exception) {
            setError(exception.message)
            update({ toast: "Ops something went wrong during save. Reload page and try again later." })
            console.error(`Error during save: ${error}`)
        }
    }

    useEffect(() => {
        //TODO: remove submitModel object to use selected object from activeModel (ManageModelProvider)
        const typeSelected =
            typeForm === 'goal' ?
                dataGoal :
            typeForm === 'assignment' ?
                dataAssignment : null

        const selectedSubmitModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
        if (selectedSubmitModel && Object.keys(selectedSubmitModel).length) {
            setModel(prevModel => ({
                ...prevModel,
                submitModel: selectedSubmitModel
            }))
        }
    }, [dataGoal, dataAssignment, selectedTag])

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

    return (
        isLoading ? <div id="load-element" className='loading-animation'></div> :
            ((model.submitModel && model.submitModel.id) || model.mainModelID === null) ?
                (
                    <Form typeForm={typeForm} functionFormMap={functionFormMap}
                        model={model.submitModel} booleanFormMap={booleanFormMap}
                        contextFormMap={contextFormMap} />
                )
                :
                null
    )
}

export default ModalForm