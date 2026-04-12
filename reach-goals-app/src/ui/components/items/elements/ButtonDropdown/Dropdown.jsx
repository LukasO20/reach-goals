import ButtonAction from '../ButtonAction/ButtonAction'
import ButtonToggle from '../ButtonToggle/ButtonToggle'

/**
 * @typedef {object} DropdownOption
 * @property {string} id
 * @property {string} title
 * @property {string} icon
 * @property {string} classBtn
 * @property {'button-action' | 'button-toggle'} uiMode
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
                options.map((option) => {
                    const uiMode = option.uiMode ?? 'button-action'

                    return (
                        <div className={`item-option ${option.id}`} key={option.id}>
                            {uiMode === 'button-action' && (
                                <ButtonAction
                                    classBtn={`plan-round max-width dropdown-option ${option.classBtn}`}
                                    title={option.title}
                                    icon={option.icon}
                                    onClick={() => option.onClick(option.id)}
                                />
                            )}
                            {uiMode === 'button-toggle' && (
                                <ButtonToggle
                                    classBtn={option.classBtn}
                                    title={option.title}
                                    onToggle={() => option.onClick()}
                                />
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dropdown