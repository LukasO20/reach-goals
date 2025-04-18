import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { ModalListContext } from '../../../provider/ModalListProvider'

import * as goalAction from '../../../provider/goal/goalAction'
import * as assignmentAction from '../../../provider/assignment/assignmentAction'

import ButtonAction from '../items/elements/ButtonAction'
import ButtonDropdown from '../../components/items/elements/ButtonDropdown'
import ModalList from '../panels/ModalList'
import Assignment from '../items/models/Assignment'
import Goal from '../items/models/Goal'

import moment from 'moment'

import '../../styles/items/Elements.scss'
import '../../styles/panels/Objectives.scss'

const iconMap = {
    assignment: 'fa-solid fa-list-check',
    goal: 'fa-solid fa-bullseye'
}

const titleMap = {
    assignment: 'Create your assignment',
    goal: 'Create your goal'
}

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const formsInputMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' />
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
                {typeForm === 'goal' ? 
                    <Assignment focused={modelObject.model} />
                    : 
                    undefined
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
    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'
    const titleForm = titleMap[typeForm] || 'Create your objective'
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)

    const goalEmpty = {
        name: '',
        description: '',
        status: undefined,
        start: undefined,
        end: undefined,
        assignments: []
    }
    
    const assingmentEmpty = {
        name: '',
        description: '',
        duration: '',
        status: undefined,
        start: '',
        end: '', 
        goal: undefined
    }

    const [goal, setGoal] = useState(goalEmpty)
    const [assingment, setAssignment] = useState(assingmentEmpty)

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)

    const nullModal = () => { setSelectModel(null) }

    const formatDate = (modalForm) => {
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
        const { name, value } = e?.target || e
    
        if (typeForm === 'goal') {
            const assignmentsRelation = e.assignments ?? goal.assignments

            setGoal((prevData) => ({
                ...prevData,
                [name]: value,
                assignments: [...assignmentsRelation]
            }))
        } else {
            setAssignment((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    console.log('DEPOIS DA ATT- ', goal)

    const handleSubmit = async () => {
        setError(null)
        setSucess(false)

        try {
            if (typeForm === 'goal') {
                goal.id ? await goalAction.updateGoal(goal) : await goalAction.addGoal(goal)  
                setGoal(goalEmpty)
            } else {
                assingment.id? await assignmentAction.updateAssignment(assingment) : await assignmentAction.addAssignment(assingment)
                setAssignment(assingmentEmpty)
            }
            setSucess(true)
        
        } catch (error) {
            setError(error.message)
        }
    }

    const handleTarget = (typeForm) => {
        let objectTarget = typeForm === 'goal' ? goal : assingment
        const fotmatedDate = formatDate(objectTarget)
        objectTarget = { ...objectTarget, ...fotmatedDate }
        return objectTarget
    }

    useEffect(() => {
        const loadGoal = async (id) => {
            if (id === null ) { 
                setGoal(goalEmpty)
                return
            } 
            
            try {
                const getGoal = await goalAction.getGoal(id)
                console.log('GOAL GETED - ', getGoal)
                setGoal(getGoal)
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }
        } 

        loadGoal(selectModel)
    }, [selectModel])

    const modelTarget = handleTarget(typeForm)

    return (
        <div className='container-form-modal center-content' onClick={(e) => { handleModalList(modalListMap(false), e); toggleVisibility(targetMap(classRemove), e) }}>
            <div className='head'> 
                <div className='objective-icon'>
                    <i className={`icon-st ${icon}`}></i>
                </div>
                <div className='objective-options'> 
                    <div className='objective-op'>
                        <ButtonAction onClick={typeForm === 'goal' ? nullModal : true} target={targetMap(['panel-center', 'assignment'], { maintain: true })} classBtn='op-form-assignment button-op-objective button-st' title='assingments'/>
                        <ButtonAction onClick={typeForm === 'assignment' ? nullModal : true} target={targetMap(['panel-center', 'goal'], { maintain: true })} classBtn='op-form-goal button-op-objective button-st' title='goals'/>
                    </div>
                    <div className='objective-color'>
                        <label className='color'></label>
                    </div>
                </div>
                <div className='objective-buttons-options'>
                    <ButtonAction target={targetMap(null)} classBtn='button-action-p close-modal button-st' iconFa='fa-solid fa-xmark'/>
                </div>
            </div>
            <div className='body'>
                <h2>{titleForm}</h2>
                <div className='objective-forms'>
                    <form>
                        <div className='field-forms name'>
                            <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name...`}
                                name='name' value={modelTarget?.name || ''} onChange={handleChange} />
                        </div>
                        <div className='field-forms start-date'>
                            <input id={`${typeForm}-start-date`} className='input-form' type='text' placeholder='set start date'
                                name='start' value={modelTarget?.start || ''} onChange={handleChange} />
                        </div>
                        <div className='field-forms end-date'>
                            <input id={`${typeForm}-end-date`} className='input-form' type='text' placeholder='set end date'
                                name='end' value={modelTarget?.end || ''} onChange={handleChange} />
                        </div>
                        <div className='field-forms status'>
                            <ButtonDropdown target={targetMap(`${typeForm}-status`, { add: true })} classBtn='dropdown-form' title='choose an option' opening='modal-form' dropdownValue={modelTarget?.status || undefined} changeDropdownValue={handleChange} dataSelectable={true} />
                        </div>
                        {/* <div className='field-forms reminder-date'>
                            <ButtonDropdown target={targetMap(`${typeForm}-reminder-date`, { add: true })} classBtn='dropdown-form' title='choose an option' dataSelectable={true} />
                        </div> */}
                        {formsInputMap(typeForm)}
                        <div className='item-forms tag'>
                            <div className='item-forms head'>
                                <div className='item-head-1'>tags</div>
                                <div className='item-head-2'></div>
                            </div>
                            <div className='item-forms body'></div>
                        </div>
                        {formsItemMap(typeForm, { model: modelTarget })}
                        <div className='field-forms details'>
                            <textarea id={`${typeForm}-details`} className='input-form' placeholder='details here...'
                                name='description' value={modelTarget?.description || ''} onChange={handleChange}></textarea>
                        </div>
                        <div className='bottom-form'>
                            <label onClick={handleSubmit}>save</label>
                        </div>
                        <div className='bottom-form-messagae'>
                            {
                                success &&                             
                                <p className='message successfull'>
                                    <label>{typeForm === 'goal' ? 'Goal save with success!' : 'Assignment save with success!'}</label>
                                </p>
                            }
                            {
                                error &&
                                <p className='message error'>
                                    <label>{`Ops, something went wrong: ${error}`}</label>
                                </p>
                            }
                        </div>
                    </form>
                </div>
            </div>
            {modalList.open && (
                <ModalList title={`Complementing ${typeForm === 'goal' ? 'an assignment' : 'a goal'}`} complement={typeForm === 'goal' ? 'assignment' : 'goal'} exFunction={handleChange} />
            )}
        </div>
    )
}

export default ModalForm