import { useNavigate } from 'react-router-dom'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'

import { iconMap } from '../../../../utils/mapping/mappingIcons'
import { visibilityMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils'

import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../../items/elements/button-action'
import ModalDetailsGoal from './modal-details-goal.jsx'
import ModalDetailsAssignment from './modal-details-assignment.jsx'
import Line from '../../../../ui/items/elements/line'

import moment from 'moment'

/** @typedef {import('../types.js').ModalDetailsContentProps} Props */

/**
 * @param {Props} props
 */
const ModalDetailsContent = ({
    type,
    name,
    status,
    duration,
    end,
    description,
    goal,
    assignments = [],
    tags = []
}) => {
    const { data: { layout } } = useSwitchLayout()
    const navigate = useNavigate()

    const hasEndDate = !!end
    const hasDescription = !!description
    const shouldRenderGoalContent = type === 'goal'
    const shouldRenderAssignmentContent = type === 'assignment'

    const handleClickButtonAction = () => navigate(`/${layout.page.pageName}`) // return standard route during handle

    const iconStatus = status === 'conclude' ? 'check' : status
    const subHeadClass = cx(
        `sub-head
        ${status}
        `
    )

    if (!name) return null

    return (
        <>
            <div className='head'>
                <div>
                    <span className='title'>
                        {iconMap[type]}
                        {name}
                    </span>
                    {hasEndDate && (
                        <span className='sub-title'>
                            {`Schedule to end on ${moment(end).format('MMMM DD')}`}
                        </span>
                    )}
                </div>
                <ButtonAction
                    visibility={visibilityMap(['modal-center', type], { maintain: true })}
                    switchLayout={switchLayoutMap({
                        area: 'modal',
                        layout: { modalName: 'modal-center', layoutName: 'form' }
                    })}
                    classBtn='circle edit'
                    icon='edit'
                />
                <ButtonAction
                    visibility={visibilityMap(null)}
                    onClick={handleClickButtonAction}
                    classBtn='circle close'
                    icon='close'
                />
            </div>
            <div className={subHeadClass}>
                <label className='label-status'>
                    {iconMap[iconStatus]}
                    {status}
                </label>
            </div>
            <div className='body'>
                {hasDescription && (
                    <div className='description'>
                        <div className='body scrollable'>
                            {description}
                        </div>
                    </div>
                )}
                <Line />
                {shouldRenderGoalContent && (
                    <ModalDetailsGoal assignments={assignments} tags={tags} />
                )}
                {shouldRenderAssignmentContent && (
                    <ModalDetailsAssignment goal={goal} tags={tags} duration={duration} />
                )}
            </div>
        </>
    )
}

export default ModalDetailsContent