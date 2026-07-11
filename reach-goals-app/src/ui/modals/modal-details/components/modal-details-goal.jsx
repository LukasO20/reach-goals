import { calculatePercent } from '../../../../utils/utils.js'

import Icons from '../../../elements/icons'
import ModalDetailsTagRelation from './modal-details-tag-relation.jsx'

/** @typedef {import('../types.js').ModalDetailsGoalProps} Props */

/**
 * @param {Props} props
 */
const ModalDetailsGoal = ({ assignments, tags }) => {

    const dataAssignment = {
        progress: assignments.filter(a => a.status === 'progress'),
        conclude: assignments.filter(a => a.status === 'conclude'),
        cancel: assignments.filter(a => a.status === 'cancel')
    }

    return (
        <div className='details-goal'>
            <div className='goal-bars'>
                {Object.entries(dataAssignment).map(([key, itens]) => {
                    const percent = calculatePercent(itens.length, assignments.length)
                    const labelHead = itens.length <= 1 ? `${itens.length} Assignment - ${key}` : `${itens.length} Assignments - ${key}`

                    return (
                        <div key={key} className={`bar ${key}`}>
                            <div className='head'>
                                <Icons icon='icon-assignment' />
                                <label>{labelHead}</label>
                            </div>
                            <div className='body'>
                                <div className='bar-progress' style={{ width: `${percent}%` }} />
                                <label className='label-percent'>{percent}%</label>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ModalDetailsTagRelation type='goal' tags={tags} />
        </div>
    )
}

export default ModalDetailsGoal