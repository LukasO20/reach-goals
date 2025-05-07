import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { ModalListContext } from '../../../provider/ModalListProvider'

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

const formsInputMap = (typeForm, exFunction) => {
    const form = typeForm === 'assignment' ?
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} />
        </div>  
        : undefined

    return form
}

const formsItemMap = (typeForm, modelObject) => {
    const refFormItem = typeForm === 'goal' ? 'assignment' : 'goal'
    const formItem = 
        <div className={`item-forms ${refFormItem}`}>
            <div className='item-forms head'>
                <div className='item-head-1'>
                    <label>{`${refFormItem}s`}</label>
                    <ButtonAction modalList={modalListMap(true, typeForm)} classBtn={`form-modallist-${typeForm} button-st`} iconFa='fa-solid fa-plus' title='Add'/>
                </div>
                <div className='item-head-2'></div>
            </div>
            <div className='item-forms body'>
                {   
                    typeForm === 'goal' && <Assignment focused={modelObject.model} formMode={true} />
                }
            </div>
        </div>

    return formItem
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { selectModel, setSelectModel } = useContext(ManageModelContext)
    const { modalList, handleModalList } = useContext(ModalListContext)

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)

    const goalEmpty = {
        name: '',
        description: '',
        status: undefined,
        start: undefined,
        end: undefined,
        assignments: [],
        tags: []
    }
    
    const assignmentEmpty = {
        name: '',
        description: '',
        duration: '',
        status: undefined,
        start: '',
        end: '', 
        goal: null,
        tags: []
    }

    const tagEmpty = {
        name: '',
        color: ''     
    }

    const [goal, setGoal] = useState(goalEmpty)
    const [assignment, setAssignment] = useState(assignmentEmpty)
    const [tag, setTag] = useState(tagEmpty)

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)

    const nullModal = () => { setSelectModel(null) }

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

    const handleChange = async (e) => {
        const { name, value } = e.target || e

        if (typeForm === 'goal') {
            const assignmentsRelation = e.assignments ?? goal.assignments

            setGoal((prevData) => ({
                ...prevData,
                [name]: value,
                assignments: [...assignmentsRelation]
            }))
        } else if (typeForm === 'assignment') {
            setAssignment((prevData) => ({
                ...prevData,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null
            }))
        } else {
            setTag((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    console.log('BEFORE TO ATT MODEL - ', typeForm === 'goal'? goal : typeForm === 'assignment' ? assignment : tag)

    const handleSubmit = async () => {
        setError(null)
        setSucess(false)

        try {
            if (typeForm === 'goal') {
                goal.id ? await goalAction.updateGoal(goal) : await goalAction.addGoal(goal)  
                setGoal(goalEmpty)
            } else if (typeForm === 'assignment') {
                assignment.id? await assignmentAction.updateAssignment(assignment) : await assignmentAction.addAssignment(assignment)
                setAssignment(assignmentEmpty)
            } else {
                tag.id? await tagAction.updateTag(tag) : await tagAction.addTag(tag)
                setTag(tagEmpty)
            }
            setSucess(true)
        
        } catch (error) {
            setError(error.message)
        }
    }

    const handleTarget = (typeForm) => {
        let objectTarget = typeForm === 'goal' ? goal : typeForm === 'assignment' ? assignment : tag
        const fotmatedDate = formatDate(objectTarget)
        objectTarget = { ...objectTarget, ...fotmatedDate }
        return objectTarget
    }

    useEffect(() => {
        const loadModel = async (id) => {
            if (id === null ) {
                typeForm === 'goal' ? setGoal(goalEmpty) : setAssignment(assignmentEmpty)
                return
            } 

            try {
                const getModel = typeForm === 'goal' ? await goalAction.getGoal(id) : await assignmentAction.getAssignment(id)
                typeForm === 'goal' ? setGoal(getModel) : setAssignment(getModel)
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }  
        }

        loadModel(selectModel)
    }, [selectModel])

    const modelTarget = handleTarget(typeForm)

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

    return (
        <Form typeForm={typeForm} functionFormMap={functionFormMap} model={modelTarget} booleanFormMap={booleanFormMap} contextFormMap={contextFormMap} stateFormMap={stateFormMap} />
    )
}

export default ModalForm