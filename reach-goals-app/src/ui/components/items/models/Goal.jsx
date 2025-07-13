import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useGetModel } from '../../../../hook/useGetModel.js'
import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils.js'

import ButtonAction from '../elements/ButtonAction.jsx'

import '../../../styles/items/models/Goal.scss'

const Goal = (props) => {
    const [goal, setGoal] = useState([])
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)

    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const display = props.display ?? {
        sideAction: false,
        type: 'mini-list'
    }
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const requestPropsGetGoal = {
        type: 'goal',
        goalAssignmentRelation: props.goalAssignmentRelation ?? null,
        goalSomeID: props.goalSomeID ?? null,
        goalTagRelation: props.goalTagRelation ?? null,
        notAssignmentRelation: props.notAssignmentRelation ?? null
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsGetGoal)
    const { data: deleteData, deleteModel } = useDeleteModel({})

    const getGoal = () => {
        try { setGoal(getData) }
        catch (error) { setErro(`Failed to load goal: ${error.message}`) }
    }

    const deleteGoal = (id) => {
        deleteModel({ type: 'goal', goalID: id })
        setGoal((prevGoal) => prevGoal.filter((goal) => goal.id !== id))
    }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = goal.find(m => m.id === id)
            if (model.transportModel.length > 0 && visibleElements.includes('panel-center') && visibleElements.includes('assignment')) return

            addToTransportModel({ ...selected, type: 'goal' })
            return updateSubmitModel({ keyObject: 'goalID', value: id })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' }))
            setPendingPanel(true)
            return
        }
    }

    useEffect(() => { 
        getGoal() 
    
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
            toggleVisibility(targetMap(['panel-right', 'goal']))
            setPendingPanel(false)
        }

    }, [getData, model.mainModelID, pendingPanel])

    console.log('GOAL LOADED - ', goal)

    return (
        goal.map(goal => (
            <div className={`goal ${display.type}`} id={goal.id} key={goal.id} onClick={(e) => goalClick(goal.id, e)}>
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