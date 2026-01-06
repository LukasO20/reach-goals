import { useContext, useEffect, useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import Card from '../../elements/Card/Card.jsx'
import CardMini from '../../elements/CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import moment from 'moment'

import '../Goal/Goal.scss'

const Goal = ({ status, display, selectableModel = false, detailsModel = false }) => {
    const [erro, setErro] = useState(false)

    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { page: { data: dataPage }, modal: { data: dataPanel }, remove, removeSuccess, removing, removingVariables } = useGoalProvider()

    const currentScope = model.filter.goal.scope
    const currentFilter = model.filter.goal[currentScope]
    const baseData = model.dataModel.goal[currentFilter.source]?.data ?? dataPage ?? []

    const renderCard = baseData?.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
        && item.status === status
    )

    const renderCardMini = baseData

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

        if (selectableModel) {
            const selected = baseData.find(m => m.id === goal.id)

            if (model.transportModel.goal.length > 0) return

            addToTransportModel({ ...selected, type: 'goal', custom: { end: moment(selected.end).format('MMMM DD') } })
            toggleVisibility(visibilityMap('modal-list-goal', { remove: true }))
            return updateFormModel({
                keyObject: 'goalID',
                value: goal.id
            })
        }

        if (detailsModel) {
            setModel(prev => ({ ...prev, mainModelID: goal.id, formModel: goal, typeModel: 'goal' }))
            updateSwitchLayout(switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } }))
            toggleVisibility(visibilityMap(['modal-right', 'goal']))
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

Goal.propTypes = {
    display: PropTypes.exact({
        type: PropTypes.string.isRequired,
        sideAction: PropTypes.bool
    }).isRequired,
    selectableModel: PropTypes.bool,
    detailsModel: PropTypes.bool
}

export default Goal