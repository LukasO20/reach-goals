import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider'
import { useManageModel } from '../../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../../provider/ui/visibility-provider'
import { useCheckbox } from '../../../../provider/ui/checkbox-provider'

import { displayModesMap, switchLayoutMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import CardRelation from '../../elements/card-relation'

/** @typedef {import('./types.js').AssignmentProps} Props */

/**
 * @param {Props} props
 */
const AssignmentGoalRelation = ({
    status,
    display = displayModesMap,
    source,
    detailsModel,
    showTags,
}) => {
    const { setModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()
    const { remove, removing, removingVariables } = useAssignmentProvider()
    const { valuesCheckbox } = useCheckbox()

    const pendingState = {
        removing: removing,
        removingVariables: removingVariables
    }

    const assignmentClick = (assignment, e) => {
        e.stopPropagation()

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: assignment.id, activeModel: assignment, typeModel: 'assignment' }))
            setSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'assignment']))
        }
    }

    const deleteAssignment = async (id) => { remove(id) }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { console.error(`Failed to edit this assignment: ${error}`) }
    }

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
    }

    return (
        <CardRelation
            type='assignment'
            typeRelation='assignment-goal'
            model={source}
            checkboxState={valuesCheckbox}
            display={display}
            clickFunction={clickEvents}
            pendingState={pendingState}
            showTags={showTags}
            status={status}
        />
    )
}

export default AssignmentGoalRelation