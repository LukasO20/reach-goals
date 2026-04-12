import { cx } from '../../../../../utils/utils'

import './ButtonToggle.scss'

/**
 * @param {Object} props
 * @param {boolean} props.active 
 * @param {function} props.onToggle
 * @param {string} props.classBtn
 * @param {string} [props.title]
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