import ButtonAction from '../button-action'
import ButtonToggle from '../button-toggle'
import DropdownGroups from './dropdown-group'

/** @typedef {import('./types.js').ButtonDropdownProps} Props */

/**
 * @param {Props} props
 */
const Dropdown = ({ options = [] }) => {
    return (
        <div className='dropdown-menu'>
            {
                options.map((option) => {
                    const uiMode = option.uiMode ?? 'button-action'
                    const isGroup = Array.isArray(option)
                    const isSingle = !isGroup

                    return (
                        <div className={`item-option ${option.id ?? 'group'}`} key={option.id}>
                            {uiMode === 'button-action' && (
                                <>
                                    {isSingle && (
                                        <ButtonAction
                                            key={option.id}
                                            classBtn={`plan-round max-width dropdown-option ${option.classBtn}`}
                                            title={option.title}
                                            icon={option.icon}
                                            onClick={() => option.onClick(option.id)}
                                        />
                                    )}
                                    {isGroup && <DropdownGroups options={option} />}
                                </>
                            )}
                            {uiMode === 'button-toggle' && (
                                <>
                                    {isSingle && (
                                        <ButtonToggle
                                            key={option.id}
                                            classBtn={option.classBtn}
                                            title={option.title}
                                            onToggle={() => option.onClick()}
                                        />
                                    )}
                                    {isGroup && <DropdownGroups options={option} />}
                                </>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dropdown