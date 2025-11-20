import { useContext, useEffect, useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Goal/Goal.scss'

import moment from 'moment'

const Goal = (props) => {
    const [erro, setErro] = useState(false)

    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent, layoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { page: { data: dataPage }, panel: { data: dataPanel }, remove } = useGoalProvider()

    const status = props.status
    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const currentScope = model.filter.goal.scope
    const currentFilter = model.filter.goal[currentScope]
    const render = model.dataModel.goal[currentFilter.source]?.data ?? dataPage

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
            const selected = render.find(m => m.id === goal.id)

            if (model.transportModel.goal.length > 0) return

            addToTransportModel({ ...selected, type: 'goal', custom: { end: moment(selected.end).format('MMMM DD') } })
            toggleVisibility(targetMap('modal-list-goal', { remove: true }))
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
        const currentData = currentScope === 'page' ? dataPage : dataPanel

        if (currentFilter.source === 'core' || currentFilter.source === 'support') {
            updateDataModel(currentData, 'goal', currentFilter.source)
        }
    }, [dataPage, dataPanel])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    return (
        render?.length ?
            <CardItem type={'goal'}
                model={(() => {
                    return typeof status === 'string' && status !== '' ?
                        render.filter(item => item.status === status) : render
                })()}
                clickFunction={clickEvents} display={display} />
            : null
    )
}

export default Goal