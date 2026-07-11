import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useCheckbox } from '../../../provider/ui/checkbox-provider'

import { displayModesMap, switchLayoutMap, visibilityMap } from '../../../utils/mapping/mappingUtils.js'
import { updateActiveModelMap, addToSelectedModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import CardRelation from './components/card-relation.jsx'

/** @typedef {import('./types.js').AssignmentProps} Props */

/**
 * @param {Props} props
 */
const Assignment = ({
    status,
    display = displayModesMap,
    source,
    selectableModel,
    detailsModel,
    draggable,
    checkboxModel,
    showTags,
}) => {
    const { model, setModel, updateActiveModel, addToSelectedModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()
    const { remove, removeSuccess, removing, removingVariables } = useAssignmentProvider()
    const { valuesCheckbox } = useCheckbox()

    const sourceData = source?.assignments ?? source

    const sourceDataFiltered = sourceData.filter(item =>
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
            const dataUpdateActiveModel = updateActiveModelMap({
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
            return updateActiveModel(dataUpdateActiveModel)
        }

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: assignment.id, activeModel: assignment, typeModel: 'assignment' }))
            setSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'assignment']))
        }
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            const dataUpdateActiveModelMap = updateActiveModelMap({
                keyObject: 'assignments',
                value: { id },
                type: 'array',
                action: 'remove'
            })
            updateActiveModel(dataUpdateActiveModelMap)
        }
    }

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    return (
        sourceDataFiltered
            .filter((item) => !status || status.includes(item.status))
            .sort((a, b) => a.order - b.order)
            .map((item, index) => (
                <CardRelation
                    type='assignment'
                    item={item}
                    itemID={item.id}
                    index={index}
                    pendingState={pendingState}
                    checkboxState={valuesCheckbox}
                    clickFunction={clickEvents}
                    display={display}
                    draggable={draggable}
                    checkboxModel={checkboxModel}
                    showTags={showTags}
                    key={index}
                />
            )
        ))
}

export default Assignment