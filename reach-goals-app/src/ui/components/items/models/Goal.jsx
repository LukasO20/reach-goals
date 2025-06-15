import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useGetModel } from '../../../../hook/useGetModel'
import { useDeleteModel } from '../../../../hook/useDeleteModel'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'

import { insertModelComponent } from '../../../utils/layout/uiLayout'
import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils'

import ButtonAction from '../elements/ButtonAction'

import '../../../styles/items/models/Goal.scss'

const Goal = (props) => {
    const [goal, setGoal] = useState([])
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { manageModel, setManageModel } = useContext(ManageModelContext)
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
    const isSelectableModel = props.selectableModel ?? false

    const requestPropsGetGoal = {
        type: 'goal',
        goalAssignmentRelation: props.goalAssignmentRelation ?? null,
        goalSomeID: props.goalSomeID ?? null,
        goalTagRelation: props.goalTagRelation ?? null,
        notAssignmentRelation: props.notAssignmentRelation ?? null
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsGetGoal)

    useEffect(() => { getGoal() }, [getData])

    const getGoal = () => {
        try { setGoal(getData) }
        catch (error) { setErro(`Failed to load goal: ${error.message}`) }
    }

    const { data: deleteData, deleteModel } = useDeleteModel({})

    const deleteGoal = (id) => {
        deleteModel({ type: 'goal', goalID: id })
        setGoal((prevGoal) => prevGoal.filter((goal) => goal.id !== id))
    }

    const editGoal = useCallback((id) => {
        try { setManageModel({ ...manageModel, mainModelID: id }) }
        catch (error) { setErro(`Failed to edit this goal: ${erro.message}`) }
    }, [setManageModel])

    const handleGoalClick = useCallback((id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            return setManageModel({ ...manageModel, relatedModelID: id, typeModel: 'goal' })               
        }

        setManageModel({ ...manageModel, mainModelID: id }) 
        toggleVisibility(target, e)
        switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
    
    }, [setManageModel, toggleVisibility, target])

    console.log('GOAL SELECTED ', getData)

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
                        <ButtonAction onClick={() => editGoal(goal.id)} target={targetMap(['panel-center', 'goal'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-goal' iconFa='fa-regular fa-pen-to-square' />
                        <ButtonAction onClick={() => deleteGoal(goal.id)} target={targetMap(null)} classBtn='remove-goal' iconFa='fa-regular fa-trash-can' />
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