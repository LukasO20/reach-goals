import { cx } from '../../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').ButtonToggleProps} Props */

/**
 * @param {Props} props
 */
const ButtonToggle = ({ active, onToggle, title, classBtn = '' }) => {
    const buttonToggleClass = cx(`${active && 'active'}`)

    return (
        <div className={`button-toggle ${buttonToggleClass} ${classBtn}`} onClick={onToggle}>
            {title && (<label>{title}</label>)}
            <div className='button-toggle-bg'>
                <span className='toggle' />
            </div>
        </div>
    )
}

export default ButtonToggle