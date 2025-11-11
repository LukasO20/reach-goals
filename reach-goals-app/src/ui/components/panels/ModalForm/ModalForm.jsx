import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { iconMap, targetMap } from '../../../../utils/mapping/mappingUtils.js'
import { formatDate } from '../../../../utils/utils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Form from '../../items/forms/Form/Form.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

const formsInputMap = (typeForm, model, exFunction) => {
    const form = typeForm === 'assignment' &&
        <div className='field-forms duration'>
            <label>{iconMap['clock']}<span>duration</span></label>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} value={model?.duration} />
        </div>

    return form
}

const formsItemMap = (typeForm, modelComponent) => {
    const visibilityRelation = typeForm === 'goal' ? 'assignment' : 'goal'
    const messageRelation = typeForm === 'goal' ? 'assignments' : 'goals'

    const formItem =
        <div className={`item-forms ${typeForm === 'goal' ? 'assignment' : 'goal'}`}>
            <div className='head'>
                <div className='item-head-1'>
                    <label>{iconMap[typeForm === 'goal' ? 'assignment' : 'goal']}{messageRelation}</label>
                    <ButtonAction target={targetMap(`modal-list-${visibilityRelation}`, { add: true })}
                        classBtn={`form-modallist-${typeForm} button-action plan-round add max-width small`}
                        icon='plus' title='Add' />
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
    const { update } = useTitle()

    const { panel: { data: dataAssignment, loading: loadingAssigment }, save: saveAssignment, saveSuccess: saveAssignmentSuccess } = useAssignmentProvider()
    const { panel: { data: dataGoal, loading: loadingGoal }, save: saveGoal, saveSuccess: saveGoalSuccess } = useGoalProvider()
    const { save: saveTag, saveSuccess: saveTagSuccess } = useTagProvider()

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    const currentKeySomeID = `${typeForm}SomeID`
    const currentFilter = model?.filter[typeForm] && model.filter[typeForm]['panel']

    const [error, setError] = useState(null)

    const loadModel = (id) => {
        if (!id) return

        const filterGetModel = {
            type: typeForm,
            source: 'formModel',
            [currentKeySomeID]: id
        }

        try {
            callRefetch(filterGetModel)
            id === 'all' && resetManageModel()
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
    }

    const callRefetch = (filter) => {
        if (typeof typeForm !== 'string') return

        const filterGetModel = filter ?? {
            [currentKeySomeID]: 'all',
            type: typeForm,
            source: 'core'
        }

        const refetchMap = {
            goal: () => updateFilterModel(filterGetModel, 'goal', 'panel'),
            assignment: () => updateFilterModel(filterGetModel, 'assignment', 'panel'),
            tag: () => updateFilterModel(filterGetModel, 'tag'),
        }

        refetchMap[typeForm]()
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

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                formModel: formatted
            }))
        } else if (typeForm === 'assignment') {

            const update = {
                ...model.formModel,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                formModel: formatted
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
            callRefetch()

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
            update({ toast: `${typeForm} ${messageToastSupport} with success` })
        }
    }, [saveGoalSuccess, saveAssignmentSuccess, saveTagSuccess])

    const functionFormMap = {
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapFormsInputMap: formsInputMap,
        mapFormsItemMap: formsItemMap,
        mapHandleSubmit: handleSubmit,
        mapSetError: setError
    }

    const booleanFormMap = {
        mapClassRemove: classRemove
    }

    //TODO: Try to use a validation where render Form if the quantity of data is ONE (because FORM render only a one data), this might avoid unnecessary animation Loading
    return (
        (loadingGoal || loadingAssigment) && currentFilter.source === 'formModel' ?
            <Loading /> :
            <Form typeForm={typeForm} functionFormMap={functionFormMap}
                model={model.formModel} booleanFormMap={booleanFormMap}/>
    )
}

export default ModalForm