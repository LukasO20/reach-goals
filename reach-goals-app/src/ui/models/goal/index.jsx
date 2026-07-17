import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useCheckbox } from '../../../provider/ui/checkbox-provider'

import { switchLayoutMap, visibilityMap } from '../../../utils/mapping/mappingUtils.js'
import { addToSelectedModelMap, updateActiveModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'
import { safeDisplay, safeSource } from './defaults.js'

import moment from 'moment'

import CardSwitchRender from '../../elements/card-switch-render'
import CardDraggable from '../../elements/card-draggable'

/** @typedef {import('./types.js').GoalProps} Props */

/**
 * @param {Props} props
 */
const Goal = ({
    display = safeDisplay,
    source = safeSource,
    selectableModel,
    detailsModel,
    draggable,
    checkboxModel,
    showTags,
    status
}) => {
    const { model, setModel, updateActiveModel, addToSelectedModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()
    const { remove, removeSuccess, removing, removingVariables } = useGoalProvider()
    const { valuesCheckbox } = useCheckbox()

    const sourceData = source.goals ?? source

    const sourceDataFiltered = sourceData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
    )

    const pendingState = {
        removing: removing,
        removingVariables: removingVariables
    }

    const deleteGoal = async (id) => remove(id)

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { console.error(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (goal, e) => {
        e.stopPropagation()

        if (selectableModel) {
            const selected = sourceData.find(m => m.id === goal.id)
            const dataUpdateActiveModelMap = updateActiveModelMap({ keyObject: 'goalID', value: goal.id, action: 'add' })
            const dataAddToSelectedModel = addToSelectedModelMap({
                id: selected.id,
                name: selected.name,
                type: 'goal',
                custom: { end: moment(selected.end).format('MMMM DD') }
            })

            if (model.selectedModel.goal.length > 0) return

            addToSelectedModel(dataAddToSelectedModel)
            toggleVisibility(visibilityMap('modal-list-goal', { remove: true }))
            return updateActiveModel(dataUpdateActiveModelMap)
        }

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: goal.id, typeModel: 'goal' }))
            setSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'goal']))
        }
    }

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    return (
        sourceDataFiltered
            .filter((item) => !status || status.includes(item.status))
            .sort((a, b) => a.order - b.order)
            .map((item, index) => {
                const props = {
                    type: 'goal',
                    pendingState: pendingState,
                    checkboxState: valuesCheckbox,
                    item: item,
                    clickFunction: clickEvents,
                    display: display,
                    checkboxModel: checkboxModel,
                    showTags: showTags
                }

                return (
                    draggable 
                    ?
                    <CardDraggable cardProps={props} itemID={item.id} index={index} key={index} />
                    : 
                    <CardSwitchRender {...props} key={index} />
                )
            })
    )
}

export default Goal