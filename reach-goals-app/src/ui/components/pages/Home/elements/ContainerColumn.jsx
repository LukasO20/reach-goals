import { useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider'
import { useTitle } from '../../../../../provider/TitleProvider'

import { iconMap } from '../../../../../utils/mapping/mappingIcons'

import Assignment from '../../../items/models/Assignment/Assignment'
import Goal from '../../../items/models/Goal/Goal'
import { DragDrop, DragDropDroppable } from '../../../items/elements/DragDrop/DragDrop'

const ContainerColumn = () => {
    const { layout } = useSwitchLayout()
    const { update } = useTitle()
    const { page: { data: dataGoal = [] }, saveDragDrop: saveDragDropGoal } = useGoalProvider()
    const { page: { data: dataAssignment = [] }, saveDragDrop: saveDragDropAssignment } = useAssignmentProvider()

    const data = {
        progress: { goal: dataGoal.filter(g => g.status === 'progress'), assignment: dataAssignment.filter(a => a.status === 'progress') },
        conclude: { goal: dataGoal.filter(g => g.status === 'conclude'), assignment: dataAssignment.filter(a => a.status === 'conclude') },
        cancel: { goal: dataGoal.filter(g => g.status === 'cancel'), assignment: dataAssignment.filter(a => a.status === 'cancel') }
    }

    const layoutColumn = layout.page.layoutName
    const displayModesProps = {
        type: ['card'],
        actions: ['edit', 'delete']
    }

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
                    <div className='itens-progress column'>
                        <div className='head'>
                            {iconMap['progress']}<label>in progress</label>
                        </div>
                        <div className='body scrollable'>
                            <DragDropDroppable dragDropID='progress' className='list'>
                                {
                                    layoutColumn === 'goal' ?
                                        <Goal display={displayModesProps} detailsModel={true} source={data.progress.goal} status='progress' draggable={true} />
                                        :
                                        <Assignment display={displayModesProps} detailsModel={true} source={data.progress.assignment} status={'progress'} draggable={true} />
                                }
                            </DragDropDroppable>
                        </div>
                    </div>
                    <div className='itens-conclude column'>
                        <div className='head'>
                            {iconMap['check']}<label>conclude</label>
                        </div>
                        <div className='body scrollable'>
                            <DragDropDroppable dragDropID='conclude' className='list'>
                                {
                                    layoutColumn === 'goal' ?
                                        <Goal display={displayModesProps} detailsModel={true} source={data.conclude.goal} status='conclude' draggable={true} />
                                        :
                                        <Assignment display={displayModesProps} detailsModel={true} source={data.conclude.assignment} status={'conclude'} draggable={true} />
                                }
                            </DragDropDroppable>
                        </div>
                    </div>
                    <div className='itens-cancel column'>
                        <div className='head'>
                            {iconMap['cancel']}<label>canceled</label>
                        </div>
                        <div className='body scrollable'>
                            <DragDropDroppable dragDropID='cancel' className='list'>
                                {
                                    layoutColumn === 'goal' ?
                                        <Goal display={displayModesProps} detailsModel={true} source={data.cancel.goal} status='cancel' draggable={true} />
                                        :
                                        <Assignment display={displayModesProps} detailsModel={true} source={data.cancel.assignment} status={'cancel'} draggable={true} />
                                }
                            </DragDropDroppable>
                        </div>
                    </div>
                </div>
            </DragDrop>
        </div>
    )
}

export default ContainerColumn