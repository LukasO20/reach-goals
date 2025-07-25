import { useContext, useEffect, useState } from 'react'

import { useGetModel } from '../../../../hook/useGetModel.js'
import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils.js'
import { requestPropsGetModel } from '../../../../utils/mappingUtilsHook.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Goal.scss'

const Goal = (props) => {
    const [goal, setGoal] = useState([])
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)

    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const requestPropsGetGoal = {
        ...requestPropsGetModel,
        type: 'goal',
        goalAssignmentRelation: props.goalAssignmentRelation ?? null,
        goalSomeID: props.goalSomeID ?? null,
        goalTagRelation: props.goalTagRelation ?? null,
        notAssignmentRelation: props.notAssignmentRelation ?? null
    }

    console.log('NOW MAP REQUEST PROPS - ', requestPropsGetGoal)

    const { params: getParams, data: getData } = useGetModel({ requestProps: requestPropsGetGoal })
    const { data: deleteData, deleteModel } = useDeleteModel({})

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
        console.log('HOOK CALLING,,, ', getData)
        try { getData && setGoal(getData) }
        catch (error) { setErro(`Failed to load goal: ${error.message}`) }

        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
            toggleVisibility(targetMap(['panel-right', 'goal']))
            setPendingPanel(false)
        }

    }, [getData, pendingPanel])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    console.log('GOAL LOADED - ', goal)

    return (
        <CardItem type={'goal'} model={goal} clickFunction={clickEvents} display={display} />
    )
}

export default Goal