import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { Link } from 'react-router-dom'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'

import { insertModelComponent } from '../../../utils/layout/uiLayout'
import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils'
import { useGetModel } from '../../../../hook/useGetModel'

import ButtonAction from '../elements/ButtonAction'
import * as goalAction from '../../../../provider/goal/goalAction'

import '../../../styles/items/models/Goal.scss'

const Goal = (props) => {
    const [goal, setGoal] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const target = useMemo(() => targetMap(['panel-right', 'goal']), []) 
    const display = props.display ?? {
        sideAction: false, 
        type: 'mini-list'
    }
    
    const utilsGoal = {
        idAssignment: props.idAssignment ?? null
    }

    const requestPropsGoal = useMemo(() => ({
        type: 'goal',
        assignmentRelation: props.assignmentRelation ?? null,
        goalSomeID: props.goalSomeID ?? null
    }), [props.goalSomeID, props.assignmentRelation]) 

    const { params, data } = useGetModel(requestPropsGoal)

    const getGoal = async () => {
        try { setGoal(data) }
        catch (error) { setErro(`Failed to load goal: ${error.message}`) }
    }

    useEffect(() => { getGoal() }, [data])

    const deleteGoal = async (id) => {
        try {
            await goalAction.deleteGoal(id)
            setGoal((prevGoal) => prevGoal.filter((goal) => goal.id !== id))
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
            const isSelectableModel = props.selectableModel ?? false
            if (isSelectableModel) { 
                e.stopPropagation()
                return insertModelComponent(props, 'goal', e)
            }

            setSelectModel(id)
            toggleVisibility(target, e)
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
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
                        <label className='line-info'><i className='icon-st fa-solid fa-bullseye'></i><label>{goal.name}</label></label>
                    </div>
                }
                {
                    display.sideAction && 
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editGoal(goal.id)} target={targetMap(['panel-center', 'goal'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-goal' iconFa='fa-regular fa-pen-to-square'/>
                        <ButtonAction onClick={() => deleteGoal(goal.id)} target={targetMap(null)} classBtn='remove-goal' iconFa='fa-regular fa-trash-can'/>
                    </div>
                }
            </div>
        )) 
        // : 
        // <div className='box-message alert'>
        //     <label className='label-message'>This activity is already linked to a goal.</label>
        // </div>
    )
}

export default Goal