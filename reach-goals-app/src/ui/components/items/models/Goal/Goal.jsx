import { useContext, useEffect, useMemo, useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { filterGetModelMap, switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Goal/Goal.scss'

const Goal = (props) => {
    const [erro, setErro] = useState(false)

    const { model, setModel, updateFormModel, updateFilterModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent, layoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { data, loading, error, remove } = useGoalProvider()

    const status = props.status
    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetGoal = useMemo(() => (
        filterGetModelMap(props, 'goal', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.goalAssignmentRelation,
        props.goalSomeID,
        props.goalTagRelation,
        props.notAssignmentRelation
    ])

    const renderModel = model.dataModel.goal[filterGetGoal.source].data

    const deleteGoal = async (id) => {
        remove(id)
        update({ toast: `goal was deleted` })
    }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (goal, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = renderModel.find(m => m.id === goal.id)

            if (model.transportModel.goal.length > 0) return

            addToTransportModel({ ...selected, type: 'goal' })
            return updateFormModel({
                keyObject: 'goalID',
                value: goal.id
            })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: goal.id, formModel: goal, typeModel: 'goal' }))
            switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
            toggleVisibility(targetMap(['panel-right', 'goal']))
        }
    }

    useEffect(() => {
        if (filterGetGoal["Without key"] === "Without value") return
        updateFilterModel(filterGetGoal, 'goal')
    }, [])

    useEffect(() => {
        const currentFilter = model.filter.goal
        if (currentFilter.source === 'core' || currentFilter.source === 'support') {
            updateDataModel(data, 'goal', currentFilter.source)
        }
    }, [data])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    return (
        renderModel?.length ?
            <CardItem type={'goal'}
                model={(() => {
                    return typeof status === 'string' && status !== '' ?
                        renderModel.filter(item => item.status === status) :
                        renderModel
                })()}
                clickFunction={clickEvents} display={display} />
            : null
    )
}

export default Goal