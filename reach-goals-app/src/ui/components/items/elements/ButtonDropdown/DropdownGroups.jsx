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
 */

const DropdownGroups = ({ options = [] }) => {
    return (
        <div className='groups'>
            {options.map((option) => {
                const uiMode = option.uiMode ?? 'button-action'

                return (
                    <>
                        {uiMode === 'button-action' && (
                            <ButtonAction
                                key={option.id}
                                classBtn={`plan-round max-width dropdown-option ${option.classBtn}`}
                                title={option.title}
                                icon={option.icon}
                                onClick={() => option.onClick(option.id)}
                            />
                        )}
                        {uiMode === 'button-toggle' && (
                            <ButtonToggle
                                key={option.id}
                                classBtn={option.classBtn}
                                title={option.title}
                                onToggle={() => option.onClick()}
                            />
                        )}
                    </>

                )
            })}
        </div>
    )
}

export default DropdownGroups