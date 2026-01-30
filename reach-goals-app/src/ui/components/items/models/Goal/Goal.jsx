import { useContext, useEffect } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { addToTransportModelMap, updateDataModelMap, updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Card from '../../elements/Card/Card.jsx'
import CardMini from '../../elements/CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import moment from 'moment'

import '../Goal/Goal.scss'

const Goal = ({ status, display, sourceForm, selectableModel = false, detailsModel = false }) => {
    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { page: { data: dataPage }, modal: { data: dataPanel }, remove, removeSuccess, removing, removingVariables } = useGoalProvider()

    const currentScope = model.filter.goal.scope
    const currentFilter = model.filter.goal[currentScope]

    //First will be checked form source to render an goal, if not, will be render according goal filter
    const baseData =
        sourceForm?.goals ??
        model.dataModel.goal[currentFilter.source]?.data ??
        dataPage ??
        []

    const renderCard = baseData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
        && item.status === status
    )

    const renderCardMini = baseData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
    )

    const pendingState = {
        removing: removing,
        removingVariables: removingVariables
    }

    const deleteGoal = async (id) => { remove(id) }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { console.error(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (goal, e) => {
        e.stopPropagation()

        if (selectableModel) {
            const selected = baseData.find(m => m.id === goal.id)
            const dataUpdateFormModelMap = updateFormModelMap({ keyObject: 'goalID', value: goal.id, action: 'add' })
            const dataAddToTransportModel = addToTransportModelMap({
                id: selected.id,
                name: selected.name,
                type: 'goal',
                custom: { end: moment(selected.end).format('MMMM DD') }
            })

            if (model.transportModel.goal.length > 0) return

            addToTransportModel(dataAddToTransportModel)
            toggleVisibility(visibilityMap('modal-list-goal', { remove: true }))
            return updateFormModel(dataUpdateFormModelMap)
        }

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: goal.id, formModel: goal, typeModel: 'goal' }))
            updateSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'goal']))
        }
    }

    useEffect(() => {
        const currentData = currentScope === 'page' ? dataPage : dataPanel

        if ((currentFilter.source === 'core' || currentFilter.source === 'support') && Array.isArray(currentData)) {
            const dataUpdateDataModel = updateDataModelMap({
                data: currentData,
                type: 'goal',
                scope: currentFilter.source
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [dataPage, dataPanel, updateDataModel, currentScope, currentFilter.source])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    const isCard = display.type.includes('card')
    const isCardMini = display.type.includes('card-mini')

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
    status: PropTypes.string,
    display: PropTypes.exact({
        type: PropTypes.arrayOf(
            PropTypes.oneOf(['card', 'card-mini'])
        ).isRequired,
        actions: PropTypes.arrayOf(
            PropTypes.oneOf(['edit', 'delete', 'details', 'remove'])
        )
    }).isRequired,
    sourceForm: PropTypes.shape({
        goals: PropTypes.array.isRequired
    }),
    selectableModel: PropTypes.bool,
    detailsModel: PropTypes.bool
}

export default Goal