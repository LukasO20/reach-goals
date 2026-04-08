import ButtonAction from '../ButtonAction/ButtonAction'
import ButtonRadio from '../ButtonRadio/ButtonRadio'

/**
 * @typedef {object} DropdownOption
 * @property {string} title
 * @property {string} icon
 * @property {string} classBtn
 * @property {function} onClick
 */

/**
 * @param {object} props
 * @param {DropdownOption[]} props.options
 * @param {'button-action' | 'button-radio'} props.uiMode
 */

const Dropdown = ({ options = [], uiMode = 'button-action' }) => {
    return (
        <div className='dropdown-menu'>
            {
                options.map((option, index) => {
                    return (
                        <div className='item-option' key={`op-${index}`}>
                            {uiMode === 'button-action' ?
                                (<ButtonAction
                                    classBtn={`plan-round max-width dropdown-option ${option.classBtn}`}
                                    title={option.title}
                                    icon={option.icon}
                                    onClick={option.onClick}
                                />) :
                                (<ButtonRadio />)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dropdown