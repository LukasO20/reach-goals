import Icons from '../../icons'

import moment from 'moment'

/** @typedef {import('../types.js').EndDateProps} Props */

/**
 * @param {Props} props
 */
const EndDate = ({ end }) => {
    const hasEndDate = !!end

    if (!hasEndDate) return null

    return (
        <label className='info date'>
            <Icons icon='icon-calendar-schedule' size='medium' />
            <span>Ends on {moment(end).format('DD MMMM')}</span>
        </label>
    )
}

export default EndDate
