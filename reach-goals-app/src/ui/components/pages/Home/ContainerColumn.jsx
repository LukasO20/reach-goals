import { iconMap } from '../../../../utils/mapping/mappingUtils'

import Assignment from '../../items/models/Assignment/Assignment'
import Goal from '../../items/models/Goal/Goal'

const ContainerColumn = (props) => {
    const currentLayout = props.modelLayout

    return (
        <div className='column home'>
            <div className='itens'>
                <div className='itens-progress column'>
                    <div className='head-column'>
                        {iconMap['progress']}<label>in progress</label>
                    </div>
                    <div className='body-column scrollable'>
                        <div className='list'>
                            {
                                currentLayout === 'goal' ?
                                    <Goal display={{ sideAction: true, type: 'card' }} goalSomeID={'all'} detailsModel={true} status={'progress'} />
                                    :
                                    <Assignment display={{ sideAction: true, type: 'card' }} notGoalRelation={'all'} detailsModel={true} status={'progress'} />
                            }
                        </div>
                    </div>
                </div>
                <div className='itens-conclude column scrollable'>
                    <div className='head-column'>
                        {iconMap['check']}<label>conclude</label>
                    </div>
                    <div className='body-column'>
                        <div className='list'>
                            {
                                currentLayout === 'goal' ?
                                    <Goal display={{ sideAction: true, type: 'card' }} goalSomeID={'all'} detailsModel={true} status={'conclude'} />
                                    :
                                    <Assignment display={{ sideAction: true, type: 'card' }} notGoalRelation={'all'} detailsModel={true} status={'conclude'} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerColumn