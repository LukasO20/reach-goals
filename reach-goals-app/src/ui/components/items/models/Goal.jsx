import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { Link } from 'react-router-dom'

import ButtonAction from '../elements/ButtonAction'
import * as goalAction from '../../../../provider/goal/goalAction'

import '../../../styles/items/models/Goal.scss'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = { class: data }
    return attributes
}

const Goal = (props) => {
    const [goal, setGoal] = useState([])
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
        const fetchGoal = async () => {
            try {
                const fetched = await goalAction.getGoal()
                setGoal(fetched)

            } catch (error) {
                setErro(`Failed to load goal: ${error.message}`)
            }
        }
        fetchGoal()
    }, [])

    const deleteGoal = async (id) => {
        try {
            await goalAction.deleteGoal(id)
            setGoal((prevGoal) => prevGoal.filter((goal) => goal.id != id))
        } catch (error) {
            setErro(`Failed to delete goal: ${erro.message}`)
        }
    }

    const editGoal = useCallback(async (id) => {
        try {
            const fetched = await goalAction.getGoal(id)
            setSelectModel(fetched.id)
        } catch (error) {
            setErro(`Failed to edit this goal: ${erro.message}`)
        }
    }, [setSelectModel])

    const handleGoalClick = useCallback(
        (id, e) => {
            setSelectModel(id)
            toggleVisibility(target, e)
        },
        [setSelectModel, toggleVisibility, target]
    )

    return (
        goal.map(goal => ( 
            <div className={`goal ${display.type}`} id={goal.id} key={goal.id} onClick={(e) => handleGoalClick(goal.id, e)}>
                {
                    display.type === 'card' ?
                    <Link to={`${currentLocation}/details`}>
                        <div className='head'>
                            <label className='line-info'><i className='icon-st fa-solid fa-bullseye'></i><label>{goal.name}</label></label>
                        </div>
                        <div className='body'></div>
                    </Link>
                    :
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-list-check'></i><label>{goal.name}</label></label>
                    </div>
                }
                {
                    display.sideAction && 
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editGoal(goal.id)} target={targetMap(['panel-center', 'goal'])} classBtn='edit-goal' iconFa='fa-regular fa-pen-to-square'/>
                        <ButtonAction onClick={() => deleteGoal(goal.id)} target={targetMap(null)} classBtn='remove-goal' iconFa='fa-regular fa-trash-can'/>
                    </div>
                }
            </div>
        ))
    )
}

export default Goal