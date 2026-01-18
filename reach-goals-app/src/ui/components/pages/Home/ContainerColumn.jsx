import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider'
import { iconMap } from '../../../../utils/mapping/mappingUtils'

import Assignment from '../../items/models/Assignment/Assignment'
import Goal from '../../items/models/Goal/Goal'

const ContainerColumn = () => {
    const { layout } = useSwitchLayout()
    const layoutColumn = layout.page.layoutName
    const displayModesProps = {
        type: ['card'],
        actions: ['edit', 'delete']
    }

    return (
        <div className='column home'>
            <div className='itens'>
                <div className='itens-progress column'>
                    <div className='head'>
                        {iconMap['progress']}<label>in progress</label>
                    </div>
                    <div className='body scrollable'>
                        <div className='list'>
                            {
                                layoutColumn === 'goal' ?
                                    <Goal display={displayModesProps} detailsModel={true} status={'progress'} />
                                    :
                                    <Assignment display={displayModesProps} detailsModel={true} status={'progress'} />
                            }
                        </div>
                    </div>
                </div>
                <div className='itens-conclude column scrollable'>
                    <div className='head'>
                        {iconMap['check']}<label>conclude</label>
                    </div>
                    <div className='body'>
                        <div className='list'>
                            {
                                layoutColumn === 'goal' ?
                                    <Goal display={displayModesProps} detailsModel={true} status={'conclude'} />
                                    :
                                    <Assignment display={displayModesProps} detailsModel={true} status={'conclude'} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerColumn