import { useSwitchLayout } from '../../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useManageModel } from '../../../../../provider/model/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'
import { useCheckbox } from '../../../../../provider/ui/CheckboxProvider.jsx'

import { switchLayoutMap, visibilityMap, displayModesMap } from '../../../../../utils/mapping/mappingUtils.js'
import { addToSelectedModelMap, updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Card from '../../elements/Card/Card.jsx'
import CardMini from '../../elements/CardMini/CardMini.jsx'

import moment from 'moment'

export const GoalMap = {
    status: '',
    display: displayModesMap,
    source: [],
    selectableModel: false,
    detailsModel: false,
    draggable: false,
    checkboxModel: false,
    showTags: false,
    showStatus: false
}

/**
 * @param {Object} GoalMap
 * @param {string} GoalMap.status
 * @param {Object} GoalMap.display
 * @param {('card'|'card-mini')[]} GoalMap.display.type
 * @param {('edit'|'delete'|'details'|'remove')[]} [GoalMap.display.actions]
 * @param {Array} GoalMap.source
 * @param {boolean} GoalMap.selectableModel
 * @param {boolean} GoalMap.detailsModel
 * @param {boolean} GoalMap.draggable
 * @param {boolean} GoalMap.checkboxModel
 * @param {boolean} GoalMap.showTags
 * @param {boolean} GoalMap.showStatus
 */

const Goal = ({
    status,
    display,
    source,
    selectableModel,
    detailsModel,
    draggable,
    checkboxModel,
    showTags,
    showStatus
} = GoalMap) => {
    const { model, setModel, updateFormModel, addToSelectedModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { remove, removeSuccess, removing, removingVariables } = useGoalProvider()
    const { valuesCheckbox } = useCheckbox()

    const sourceData = source?.goals ?? source

    const renderCard = sourceData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
        && item.status === status
    )

    const renderCardMini = sourceData.filter(item =>
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
            const selected = sourceData.find(m => m.id === goal.id)
            const dataUpdateFormModelMap = updateFormModelMap({ keyObject: 'goalID', value: goal.id, action: 'add' })
            const dataAddToSelectedModel = addToSelectedModelMap({
                id: selected.id,
                name: selected.name,
                type: 'goal',
                custom: { end: moment(selected.end).format('MMMM DD') }
            })

            if (model.selectedModel.goal.length > 0) return

            addToSelectedModel(dataAddToSelectedModel)
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
            checkboxState={valuesCheckbox}
            model={isCard ? renderCard : renderCardMini}
            clickFunction={clickEvents}
            display={display}
            draggable={draggable}
            checkboxModel={checkboxModel}
            showStatus={showStatus}
            showTags={showTags}
        />
    ) : null
}

export default Goal