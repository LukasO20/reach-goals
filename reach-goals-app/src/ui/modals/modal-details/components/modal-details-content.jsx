import { useNavigate } from 'react-router-dom'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'

import { visibilityMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils'

import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../../elements/button-action'
import ModalDetailsGoal from './modal-details-goal.jsx'
import ModalDetailsAssignment from './modal-details-assignment.jsx'
import Line from '../../../../ui/elements/line'
import Icons from '../../../elements/icons'

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
                    <div className='title'>
                        <Icons icon={`icon-${type}`} size='big' />
                        <h2>
                            {name}
                        </h2>
                    </div>
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
                    icon='icon-edit'
                />
                <ButtonAction
                    visibility={visibilityMap(null)}
                    onClick={handleClickButtonAction}
                    classBtn='circle close'
                    icon='icon-close'
                />
            </div>
            <div className={subHeadClass}>
                <label className='label-status'>
                    <Icons icon={`icon-${status}`} />
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