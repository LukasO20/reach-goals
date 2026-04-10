import ButtonAction from '../ButtonAction/ButtonAction'

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
 * @param {'button-action'} props.uiMode
 */

const Dropdown = ({ options = [] }) => {
    return (
        <div className='dropdown-menu'>
            {
                options.map((option, index) => {
                    return (
                        <div className='item-option' key={`op-${index}`}>
                            <ButtonAction
                                classBtn={`plan-round max-width dropdown-option ${option.classBtn}`}
                                title={option.title}
                                icon={option.icon}
                                onClick={() => option.onClick(option.id)}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dropdown