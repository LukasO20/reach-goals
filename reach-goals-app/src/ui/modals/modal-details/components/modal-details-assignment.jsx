
import { iconMap } from '../../../../utils/mapping/mappingIcons.jsx'

import ModalDetailsTagRelation from './modal-details-tag-relation.jsx'

import moment from 'moment'

/** @typedef {import('../types.js').ModalDetailsAssignmentProps} Props */

/**
 * @param {Props} props
 */
const ModalDetailsAssignment = ({ goal, tags, duration }) => {


    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60

    const labelDuration = duration ? duration <= 59 ? `${duration} minutes` : `${hours} hours and ${remainingMinutes} minutes` : ''

    const hasGoal = !!goal
    const hasDuration = !!duration

    return (
        <div className='details-assignment'>
            <div className='split-content'>
                {hasGoal && (
                    <div className='goal-card'>
                        <div className='head'>
                            <div className='item'>
                                {iconMap['goal']}
                                <span className='name-goal'>{goal.name}</span>
                            </div>
                            {!!goal && goal.end && goal.end !== 'Invalid date' && (
                                <div className='item'>
                                    <span>schedule to end on {moment(goal.end).format('MMMM DD')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {hasDuration && (
                    <div className='duration'>
                        {iconMap['clock']}
                        <label>{labelDuration}</label>
                    </div>
                )}
            </div>
            <ModalDetailsTagRelation type='assignment' tags={tags} />
        </div>
    )
}

export default ModalDetailsAssignment