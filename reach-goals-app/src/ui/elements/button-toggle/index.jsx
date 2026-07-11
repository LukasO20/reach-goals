import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').ButtonToggleProps} Props */

/**
 * @param {Props} props
 */
const ButtonToggle = ({ active, onToggle, title, classBtn }) => {
    const buttonToggleClass = cx(
        `button-toggle
        ${active && 'active'}
        ${classBtn}
        `
    )

    return (
        <div className={buttonToggleClass} onClick={onToggle}>
            {title && (<label>{title}</label>)}
            <div className='button-toggle-bg'>
                <span className='toggle' />
            </div>
        </div>
    )
}

export default ButtonToggle