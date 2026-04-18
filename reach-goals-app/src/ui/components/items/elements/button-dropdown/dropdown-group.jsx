import ButtonAction from '../button-action'
import ButtonToggle from '../button-toggle'

/** @typedef {import('./types.js').ButtonDropdownProps} Props */

/**
 * @param {Props} props
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