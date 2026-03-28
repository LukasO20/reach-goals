import { useSwitchLayout } from '../../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { useManageModel } from '../../../../../provider/model/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'
import { useCheckbox } from '../../../../../provider/ui/CheckboxProvider.jsx'

import { displayModesMap, switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { updateFormModelMap, addToSelectedModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Card from '../../elements/Card/Card.jsx'
import CardMini from '../../elements/CardMini/CardMini.jsx'

export const AssignmentMap = {
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
 * @param {Object} AssignmentMap
 * @param {string} AssignmentMap.status
 * @param {Object} AssignmentMap.display
 * @param {('card'|'card-mini')[]} AssignmentMap.display.type
 * @param {('edit'|'delete'|'details'|'remove')[]} [AssignmentMap.display.actions]
 * @param {Array} AssignmentMap.source
 * @param {boolean} AssignmentMap.selectableModel
 * @param {boolean} AssignmentMap.detailsModel
 * @param {boolean} AssignmentMap.draggable
 * @param {boolean} AssignmentMap.checkboxModel
 * @param {boolean} AssignmentMap.showTags
 * @param {boolean} AssignmentMap.showStatus
 */

const Assignment = ({
    status,
    display,
    source,
    selectableModel,
    detailsModel,
    draggable,
    checkboxModel,
    showTags,
    showStatus
} = AssignmentMap) => {
    const { model, setModel, updateFormModel, addToSelectedModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { remove, removeSuccess, removing, removingVariables } = useAssignmentProvider()
    const { valuesCheckbox } = useCheckbox()

    const sourceData = source?.assignments ?? source

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

    const deleteAssignment = async (id) => { remove(id) }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { console.error(`Failed to edit this assignment: ${error}`) }
    }

    const assignmentClick = (assignment, e) => {
        e.stopPropagation()

        if (selectableModel) {
            const selected = model.dataModel.assignment.support.data.find(m => m.id === assignment.id)
            const dataUpdateFormModel = updateFormModelMap({
                keyObject: 'assignments',
                value: { id: assignment.id, name: assignment.name },
                action: 'add',
                type: 'array'
            })
            const dataAddToSelectedModel = addToSelectedModelMap({
                id: selected.id,
                name: selected.name,
                type: 'assignment'
            })

            addToSelectedModel(dataAddToSelectedModel)
            return updateFormModel(dataUpdateFormModel)
        }

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: assignment.id, formModel: assignment, typeModel: 'assignment' }))
            updateSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'assignment']))
        }
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            const dataUpdateFormModelMap = updateFormModelMap({
                keyObject: 'assignments',
                value: { id },
                type: 'array',
                action: 'remove'
            })
            updateFormModel(dataUpdateFormModelMap)
        }
    }

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
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
            type='assignment'
            pendingState={pendingState}
            checkboxState={valuesCheckbox}
            model={isCard ? renderCard : renderCardMini}
            clickFunction={clickEvents}
            display={display}
            draggable={draggable}
            checkboxModel={checkboxModel}
            showTags={showTags}
            showStatus={showStatus}
        />
    ) : null
}

export default Assignment