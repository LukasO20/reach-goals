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

const toggleSelectAssignment = (props, action, domTarget) => {
    console.log('HE CALLME')
    if (action?.setForm) {

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
    const isSelectableModel = props.selectableModel ?? false

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
            setAssignment((prevAssignment) => prevAssignment.filter((assignment) => assignment.id != id))
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
            setSelectModel(id)
            toggleVisibility(target, e)
            if (isSelectableModel) { toggleSelectAssignment() }
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