import { useContext, useEffect, useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import Card from '../../elements/Card/Card.jsx'

import '../Goal/Goal.scss'

import moment from 'moment'
import CardMini from '../../elements/CardMini/CardMini.jsx'

const Goal = (props) => {
    const [erro, setErro] = useState(false)

    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent, layoutComponent } = useSwitchLayout()
    const { page: { data: dataPage }, panel: { data: dataPanel }, remove, removeSuccess, removing, removingVariables } = useGoalProvider()

    const status = props.status
    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const currentScope = model.filter.goal.scope
    const currentFilter = model.filter.goal[currentScope]
    const baseData = model.dataModel.goal[currentFilter.source]?.data ?? dataPage

    const renderCard = baseData?.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
        && item.status === status
    ) ?? []

    const renderCardMini = baseData ?? []

    const pendingState = {
        removing: removing,
        removingVariables: removingVariables
    }

    const deleteGoal = async (id) => { remove(id) }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (goal, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = baseData.find(m => m.id === goal.id)

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

    const isCard = display?.type === 'card'
    const isCardMini = display?.type === 'card-mini'

    const componentsMap = {
        card: Card,
        cardMini: CardMini,
    }

    const ComponentToRender = isCard ? componentsMap.card : isCardMini ? componentsMap.cardMini : null

    return ComponentToRender ? (
        <ComponentToRender
            type='goal'
            pendingState={pendingState}
            model={isCard ? renderCard : renderCardMini}
            clickFunction={clickEvents}
            display={display}
        />
    ) : null
}

export default Goal