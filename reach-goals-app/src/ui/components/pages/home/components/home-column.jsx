import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider'
import { useGoalProvider } from '../../../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../../../provider/model/assignment-model-provider'
import { useTitle } from '../../../../../provider/ui/title-provider'

import { iconMap } from '../../../../../utils/mapping/mappingIcons'

import Assignment from '../../../items/models/assignment'
import Goal from '../../../items/models/goal'
import { DragDrop, DragDropDroppable } from '../../../items/elements/drag-drop' 

/** @typedef {import('../types').HomeProps} Props */

/**
 * @param {Props} props
 */
const HomeColumn = ({ data }) => {
    const { data: { layout, visibility } } = useSwitchLayout()
    const { update } = useTitle()
    const { saveDragDrop: saveDragDropGoal } = useGoalProvider()
    const { saveDragDrop: saveDragDropAssignment } = useAssignmentProvider()

    const { goal: dataGoal = [], assignment: dataAssignment = [] } = data

    const layoutColumn = layout.page.layoutName

    const dataColumn = {
        progress: { goal: dataGoal.filter(g => g.status === 'progress'), assignment: dataAssignment.filter(a => a.status === 'progress') },
        conclude: { goal: dataGoal.filter(g => g.status === 'conclude'), assignment: dataAssignment.filter(a => a.status === 'conclude') },
        cancel: { goal: dataGoal.filter(g => g.status === 'cancel'), assignment: dataAssignment.filter(a => a.status === 'cancel') }
    }

    const columnPropsReference = {
        display: {
            type: [visibility.cards],
            actions: ['edit', 'delete']
        },
        detailsModel: true,
        draggable: true,
        showTags: visibility.tagsCard,
        status: visibility.status,
        checkboxModel: true
    }

    const columnMap = [
        {
            icon: 'progress',
            type: 'progress',
            title: 'in progress'
        },
        {
            icon: 'check',
            type: 'conclude',
            title: 'conclude'
        },
        {
            icon: 'cancel',
            type: 'cancel',
            title: 'canceled'
        }
    ]

    const updateDragDropItem = ({ source, destination, draggableId }) => {
        if (!destination || !draggableId) return

        const dragDropData = { source, destination, draggableId }

        try {
            layoutColumn === 'goal' && saveDragDropGoal(dragDropData)
            layoutColumn === 'assignment' && saveDragDropAssignment(dragDropData)

        } catch (exception) {
            update({ toast: 'Ops something went wrong during save. Reload page and try again later.' })
            console.error(`Error during save: ${exception}`)
        }
    }

    const handleOnEndDrag = (result) => updateDragDropItem(result)

    return (
        <div className='column home'>
            <DragDrop onDragEnd={handleOnEndDrag}>
                <div className='list-container'>
                    {columnMap
                        .filter((item) => visibility.status?.includes(item.type))
                        .map((item) => (
                            <div className={`column ${item.type}`} key={item.type}>
                                <div className='head'>
                                    {iconMap[item.icon]}<label>{item.title}</label>
                                </div>
                                <div className='body scrollable'>
                                    <DragDropDroppable dragDropID={item.type} className='list'>
                                        {
                                            layoutColumn === 'goal' ?
                                                <Goal source={dataColumn[item.type].goal} {...columnPropsReference} />
                                                :
                                                <Assignment source={dataColumn[item.type].assignment} {...columnPropsReference} />
                                        }
                                    </DragDropDroppable>
                                </div>
                            </div>
                        ))}
                </div>
            </DragDrop>
        </div>
    )
}

export default HomeColumn