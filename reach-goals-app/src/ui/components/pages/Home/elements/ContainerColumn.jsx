import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider'
import { useTitle } from '../../../../../provider/TitleProvider'
import { useManageModel } from '../../../../../provider/ManageModelProvider'

import { iconMap } from '../../../../../utils/mapping/mappingUtils'

import Assignment from '../../../items/models/Assignment/Assignment'
import Goal from '../../../items/models/Goal/Goal'
import { DragDrop, DragDropDroppable } from '../../../items/elements/DragDrop/DragDrop'

const ContainerColumn = () => {
    const { layout } = useSwitchLayout()
    const { page: { data: dataGoal = [] }, save: saveGoal } = useGoalProvider()
    const { page: { data: dataAssignment = [] }, save: saveAssignment } = useAssignmentProvider()
    const { update } = useTitle()
    const { model, setModel } = useManageModel()
    const layoutColumn = layout.page.layoutName
    const displayModesProps = {
        type: ['card'],
        actions: ['edit', 'delete']
    }

    const disstructureDragResult = (result) => {
        const { destination, source, draggableId } = result

        const droppable = destination ?? source
        const isProgressDroppable = droppable?.droppableId?.includes('progress');
        const typeModel = droppable?.droppableId?.split('-')[2];

        return { draggableId, isProgressDroppable, typeModel }
    }

    const handleOnDragUpdate = (result) => {
        const { draggableId, isProgressDroppable, typeModel } = disstructureDragResult(result)

        setModel(prev => ({
            ...prev,
            formModel: {
                ...prev.formModel,
                id: draggableId,
                status: isProgressDroppable ? 'progress' : 'conclude'
            },
            typeModel
        }))
    }

    const handleOnEndDrag = async (result) => {
        const { typeModel } = disstructureDragResult(result)

        if (!!typeModel && model.formModel) {
            try {
                typeModel === 'goal' && await saveGoal(structuredClone(model.formModel))
                typeModel === 'assignment' && await saveAssignment(structuredClone(model.formModel))

            } catch (exception) {
                update({ toast: 'Ops something went wrong during save. Reload page and try again later.' })
                console.error(`Error during save: ${exception}`)
            }
        }
    }

    return (
        <div className='column home'>
            <DragDrop onDragEnd={handleOnEndDrag} onDragUpdate={handleOnDragUpdate}>
                <div className='list-container'>
                    <div className='itens-progress column'>
                        <div className='head'>
                            {iconMap['progress']}<label>in progress</label>
                        </div>
                        <div className='body scrollable'>
                            <DragDropDroppable dragDropID='droppable-progress-goal' className='list'>
                                {
                                    layoutColumn === 'goal' ?
                                        <Goal display={displayModesProps} detailsModel={true} source={dataGoal} status='progress' draggable={true} />
                                        :
                                        <Assignment display={displayModesProps} detailsModel={true} source={dataAssignment} status={'progress'} />
                                }
                            </DragDropDroppable>
                        </div>
                    </div>
                    <div className='itens-conclude column scrollable'>
                        <div className='head'>
                            {iconMap['check']}<label>conclude</label>
                        </div>
                        <div className='body'>
                            <DragDropDroppable dragDropID='droppable-conclude-goal' className='list'>
                                {
                                    layoutColumn === 'goal' ?
                                        <Goal display={displayModesProps} detailsModel={true} source={dataGoal} status='conclude' draggable={true} />
                                        :
                                        <Assignment display={displayModesProps} detailsModel={true} source={dataAssignment} status={'conclude'} />
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