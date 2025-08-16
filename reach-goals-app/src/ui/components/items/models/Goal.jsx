import { useContext, useEffect, useState } from 'react'

import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { useGoalModel } from '../../../../provider/model/GoalModelProvider.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { filterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Goal.scss'

const Goal = (props) => {
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)

    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useSwitchLayout()
    const { data, loading, refetch } = useGoalModel()
    const { data: deleteData, deleteModel } = useDeleteModel({})

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetGoal = {
        ...filterModelMap,
        type: 'goal',
        goalAssignmentRelation: props.goalAssignmentRelation,
        goalSomeID: props.goalSomeID,
        goalTagRelation: props.goalTagRelation,
        notAssignmentRelation: props.notAssignmentRelation
    }

    const deleteGoal = (id) => {
        deleteModel({ type: 'goal', goalID: id })
    }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = [].find(m => m.id === id)

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
        refetch(filterGetGoal)
    }, [])

    useEffect(() => {
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
            toggleVisibility(targetMap(['panel-right', 'goal']))
            setPendingPanel(false)
        }

    }, [pendingPanel])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    //console.log('GOAL LOADED - ', goal)

    return (
        loading && data.length === 0 ?
            <p>Loading...</p>
            :
            <CardItem type={'goal'} model={data} clickFunction={clickEvents} display={display} />
    )
}

export default Goal