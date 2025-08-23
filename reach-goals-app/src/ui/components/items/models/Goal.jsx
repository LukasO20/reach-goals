import { useContext, useEffect, useState } from 'react'

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
    const [activeModelSource, setActiveModelSource] = useState([])

    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useSwitchLayout()
    const { data, loading, refetch, remove } = useGoalModel()

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetGoal = {
        ...filterModelMap,
        type: 'goal',
        source: props.typeDataSource ?? 'core',
        goalAssignmentRelation: props.goalAssignmentRelation,
        goalSomeID: props.goalSomeID,
        goalTagRelation: props.goalTagRelation,
        notAssignmentRelation: props.notAssignmentRelation
    }

    const deleteGoal = async (id) => {
        await remove(id)
        refetch(filterGetGoal)
    }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = data.core.find(m => m.id === id)

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
        setActiveModelSource(data[filterGetGoal.source])
    }, [data])

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
        loading && data.core.length === 0 ?
            <p>Loading...</p>
            :
            <CardItem type={'goal'} model={activeModelSource ?? []} clickFunction={clickEvents} display={display} />
    )
}

export default Goal