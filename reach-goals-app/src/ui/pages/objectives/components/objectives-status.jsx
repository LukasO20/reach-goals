import { useManageModel } from '../../../../provider/model/manage-model-provider'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider/index.jsx'

import Line from '../../../items/elements/line'
import Icons from '../../../items/elements/icons'

const ObjectivesStatus = () => {
    const { data: { visibility } } = useSwitchLayout()
    const {
        model: { dataModel:
            { goal = { core: {} }, assignment = { core: {} } }
        }
    } = useManageModel()

    const typeLayout = visibility.layoutObjectives

    const dataMap = { goal: (goal.core.data || []), assignment: (assignment.core.data || []) }
    
    const data = dataMap[typeLayout] ?? [...dataMap.goal, ...dataMap.assignment]

    const progressCount = data.filter((item) => item.status === 'progress').length
    const concludeCount = data.filter((item) => item.status === 'conclude').length
    const cancelCount = data.filter((item) => item.status === 'cancel').length

    const labelProgressCount = progressCount <= 1 ? `${progressCount} - Activity` : `${progressCount} - Activities`
    const labelConludeCount = concludeCount <= 1 ? `${concludeCount} - Activity` : `${concludeCount} - Activities`
    const labelCancelCount = cancelCount <= 1 ? `${cancelCount} - Activity` : `${cancelCount} - Activities`

    return (
        <div className='objectives-status'>
            <label className='label-status conclude'>
                <Icons icon='icon-conclude' />
                {labelConludeCount}
            </label>
            <Line direction='vertical' />
            <label className='label-status progress'>
                <Icons icon='icon-progress' />
                {labelProgressCount}
            </label>
            <Line direction='vertical' />
            <label className='label-status cancel'>
                <Icons icon='icon-cancel' />
                {labelCancelCount}
            </label>
        </div>
    )
}

export default ObjectivesStatus