import { useContext, useEffect, useState, useMemo } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { ModalListContext } from '../../../provider/ModalListProvider'

import { useGetModel } from '../../../hook/useGetModel'

import { removeElement } from '../../utils/layout/uiLayout'

import * as goalAction from '../../../provider/goal/goalAction'
import * as assignmentAction from '../../../provider/assignment/assignmentAction'
import * as tagAction from '../../../provider/tag/tagAction'

import ButtonAction from '../items/elements/ButtonAction'
import Assignment from '../items/models/Assignment'
import Form from '../items/forms/Form'

import moment from 'moment'

import '../../styles/items/Elements.scss'
import '../../styles/panels/Objectives.scss'

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const formsInputMap = (typeForm, model, exFunction) => {
    const form = typeForm === 'assignment' &&
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} value={model?.duration} />
        </div>

    return form
}

const formsItemMap = (typeForm, modelForm) => {
    const refFormItem = typeForm === 'goal' ? 'assignment' : 'goal'
    const formItem =
        <div className={`item-forms ${refFormItem}`}>
            <div className='item-forms head'>
                <div className='item-head-1'>
                    <label>{`${refFormItem}s`}</label>
                    <ButtonAction modalList={modalListMap(true, typeForm)} classBtn={`form-modallist-${typeForm} button-st`} iconFa='fa-solid fa-plus' title='Add' />
                </div>
                <div className='item-head-2'></div>
            </div>
            <div className='item-forms body'>
                {
                    typeForm === 'goal' && <Assignment focused={modelForm.model} formMode={true} goalRelation={modelForm.model.id} />
                }
            </div>
        </div>

    return formItem
}

const submitModel = async (typeForm, model) => {
    switch (typeForm) {
        case 'goal': {
            model.id ? await goalAction.updateGoal(model) : await goalAction.addGoal(model)
            break
        }
        case 'assignment': {
            model.id ? await assignmentAction.updateAssignment(model) : await assignmentAction.addAssignment(model)
            break
        }
        case 'tag': {
            model.id ? await tagAction.updateTag(model) : await tagAction.addTag(model)
            break
        }
        default: 
            break
    }
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { selectModel, setSelectModel } = useContext(ManageModelContext)
    const { modalList, handleModalList } = useContext(ModalListContext)

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [modelProps, setModelProps] = useState({})
    const [modelTarget, setModelTarget] = useState({})
    const [resetModel, setResetModel] = useState(false)
    const { params, data } = useGetModel(modelProps, resetModel)

    const nullModal = () => {
        !selectModel && setSelectModel(null)
        setModelProps({})
        setModelTarget({})
        setResetModel(true)
    }

    const loadModel = (id) => {
        setLoading(true)

        if (id === null) {
            nullModal()
            setLoading(false)
            return
        }

        const currentKeySomeID = typeForm === 'assignment' ? 'assignmentSomeID' : typeForm === 'goal' ? 'goalSomeID' : 'tagSomeID'
        const currentUseGetModel = {
            type: typeForm,
            [currentKeySomeID]: id
        }

        try {
            setModelProps(currentUseGetModel)
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    const formatDate = (modalForm) => {
        if (!modalForm) { return }
        const { start, end } = modalForm

        const formatInputISO = (input) => {
            if (moment(input, moment.ISO_8601, true).isValid()) {
                return input ? moment(input).format('DD/MM/YYYY') : null
            }
        }

        const formatInput = (input) => {
            if (input && !moment(input, moment.ISO_8601, true).isValid()) {

                const cleanedInput = input.replace(/\D/g, '')
                if (isNaN(Number(cleanedInput))) { return '' }

                const limitedInput = cleanedInput.slice(0, 8)
                let formattedInput = ''

                if (limitedInput.length <= 2) {
                    formattedInput = limitedInput
                }
                else if (limitedInput.length <= 4) {
                    formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2)}`
                }
                else {
                    formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2, 4)}/${limitedInput.slice(4)}`
                }

                const validDate = moment(formattedInput, 'DD/MM/YYYY')
                if (!validDate.isValid()) {
                    console.error('THIS IS IS INVALID DATE (put an indicator input date error to users see)')
                }

                return formattedInput
            }
        }

        const formatStart = start ? formatInput(start) || formatInputISO(start) : undefined
        const formatEnd = end ? formatInput(end) || formatInputISO(end) : undefined

        return {
            start: formatStart,
            end: formatEnd
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target || e

        //Tag attributes
        const tagsRelation = e.tags ?? modelTarget.tags ?? []

        if (typeForm === 'goal') {
            const assignmentsRelation = e.assignments ?? modelTarget.assignments ?? []

            const update = {
                ...modelTarget,
                [name]: value,
                assignments: [...assignmentsRelation],
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModelTarget(formatted)
        } else if (typeForm === 'assignment') {

            const update = {
                ...modelTarget,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModelTarget(formatted)
        } else {

            const update = {
                ...modelTarget,
                [name]: value
            }

            setModelTarget(update)
        }
    }

    const handleSubmit = async () => {
        setError(null)
        setSucess(false)

        try {
            await submitModel(typeForm, structuredClone(modelTarget))
            setSucess(true)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleTarget = (objectTarget) => {
        const fotmatedDate = formatDate(objectTarget)
        return { ...objectTarget, ...fotmatedDate }
    }

    useEffect(() => {
        if (!resetModel) {
            loadModel(selectModel)

            if (modelProps && Object.keys(modelProps).length > 0 && selectModel) {
                setModelTarget(handleTarget(data[0]))
            }
        }
    }, [selectModel, data])

    useEffect(() => {
        resetModel && setResetModel(false)
        const removeRelationsElement = document.querySelectorAll(`.container-form-modal .body .item-forms ${typeForm}.mini-list[id]`)
        console.log('TAG TO REMOVE? ', removeRelationsElement)
        //removeElement(removeRelationsElement)

    }, [resetModel])

    const functionFormMap = {
        mapHandleModalList: handleModalList,
        mapModalListMap: modalListMap,
        mapToggleVisibility: toggleVisibility,
        mapNullModal: nullModal,
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
        mapModalList: modalList
    }

    const stateFormMap = {
        mapStateSuccess: success,
        mapStateError: error
    }

    console.log('VALUE OF LOADING - ', isLoading, modelTarget)

    console.log('SHOW FORM?  - ', selectModel, resetModel)
    return (
        isLoading ? <div id="load-element" className='loading-animation'></div> :
            ((modelTarget && modelTarget.id) || (selectModel === null && !resetModel)) ?
                (
                    <Form typeForm={typeForm} functionFormMap={functionFormMap}
                        model={modelTarget} booleanFormMap={booleanFormMap}
                        contextFormMap={contextFormMap} stateFormMap={stateFormMap} />
                )
                :
                null
    )
}

export default ModalForm