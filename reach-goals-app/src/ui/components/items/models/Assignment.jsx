import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { Link } from 'react-router-dom'

import ButtonAction from '../elements/ButtonAction'
import * as assignmentAction from '../../../../provider/assignment/assignmentAction'

import '../../../styles/items/models/Assignment.scss'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = { class: data }
    return attributes
}

const toggleSelectAssignment = (props, e) => {

    const checkElementContainer = (elementTarget, container) => {
        if (!elementTarget || !container) { console.error(`Parameter ${elementTarget ?? container} reference is null! Check parameter sended.`) }

        const childrenContainer = Array.from(container.children)
        const valueChecked = childrenContainer.length === 0 ? true : !childrenContainer.some(child => child.id === elementTarget.id)
        return valueChecked
    }

    if (props?.selectableModel) {
        if (!props?.action?.setForm) { return console.error('This model is selectable but parameter "typeModal" is needed!') }
        
        if (props.action.setForm) {
            const formGoal = document.querySelector('.content-center.goal form')
            const setAssignment = e.currentTarget       
            const containerAssignment = formGoal.querySelector('.item-forms.assignment .body')  
            const isDefinable = checkElementContainer(setAssignment, containerAssignment)

            if (isDefinable) {
                //Create a container assignment to add
                const labelAssignment = document.createElement('label')
                labelAssignment.id = setAssignment.getAttribute('id')
                labelAssignment.textContent = setAssignment.querySelector('.line-info label').textContent

                //Create a input assignment to add
                const inputAssignment = document.createElement('input')
                inputAssignment.type = 'hidden'
                inputAssignment.name = 'assignment[]'
                inputAssignment.id = setAssignment.getAttribute('id')
                inputAssignment.value = setAssignment.getAttribute('id')

                containerAssignment.appendChild(inputAssignment)
                containerAssignment.appendChild(labelAssignment)

                //IS NOT WORKING 100% NOW. Try to create "external props: exProps.props". Then will be able to share functions and components props
                if (typeof props.exFunction === 'function') {
                    Array.from(containerAssignment?.children).forEach(assignmentEl => {
                        props.exFunction(assignmentEl)
                    })
                }
            }
        }
    }
}

const Assignment = (props) => {
    const [assignment, setAssignment] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const target = useMemo(() => targetMap('panel-left'), []) 
    const display = props.display ?? {
        sideAction: false, 
        type: 'mini-list'
    }

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const fetched = await assignmentAction.getAssignment()
                setAssignment(fetched)
            } catch (error) {
                setErro(`Failed to load assignment: ${error.message}`)
            }
        }
        fetchAssignment()
    }, [])

    const deleteAssignment = async (id) => {
        try {
            await assignmentAction.deleteAssignment(id)
            setAssignment((prevAssignment) => prevAssignment.filter((assignment) => assignment.id !== id))
        } catch (error) {
            setErro(`Failed to delete assignment: ${erro.message}`)
        }
    }

    const editAssignment = useCallback(async (id) => {
        try {
            const fetched = await assignmentAction.getAssignment(id)
            setSelectModel(fetched.id)
        } catch (error) {
            setErro(`Failed to edit this assignment: ${erro.message}`)
        }
    }, [setSelectModel])

    const handleAssignmentClick = useCallback(
        (id, e) => {
            const isSelectableModel = props.selectableModel ?? false

            if (isSelectableModel) { 
                e.stopPropagation()
                return toggleSelectAssignment(props, e)
            }

            setSelectModel(id)
            toggleVisibility(target, e)
        },
        [setSelectModel, toggleVisibility, target]
    )

    return (
        assignment.map(assignment => ( 
            <div className={`assignment ${display.type}`} id={assignment.id} key={assignment.id} onClick={(e) => handleAssignmentClick(assignment.id, e)}>
                {
                    display.type === 'card' ?
                    <Link to={`${currentLocation}/details`}>
                        <div className='head'>
                            <label className='line-info'><i className='icon-st fa-solid fa-list-check'></i><label>{assignment.name}</label></label>
                        </div>
                        <div className='body'></div>
                    </Link>
                    :
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-list-check'></i><label>{assignment.name}</label></label>
                    </div>
                }
                {
                    display.sideAction && 
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editAssignment(assignment.id)} target={targetMap(['panel-center', 'assignment'])} classBtn='edit-assignment' iconFa='fa-regular fa-pen-to-square'/>
                        <ButtonAction onClick={() => deleteAssignment(assignment.id)} target={targetMap(null)} classBtn='remove-assignment' iconFa='fa-regular fa-trash-can'/>
                    </div>
                }
            </div>
        ))
    )
}

export default Assignment