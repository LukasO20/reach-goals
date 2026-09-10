import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../button-action'
import ButtonToggle from '../../button-toggle'
import Tooltip from '../../tooltip'
import DropdownGroups from './dropdown-group'

/** @typedef {import('../types.js').ButtonDropdownProps} Props */

/**
 * @param {Props} props
 */
const Dropdown = ({ options = [] }) => {
    return (
        <div className='dropdown-menu'>
            {options.map((option) => {
                const uiMode = option.uiMode ?? 'button-action'

                const itemOptionClass = cx(
                    `item-option
                    ${option.id ?? 'group'}
                    `
                )
                const buttonActionClass = cx(
                    `plan-round
                    dropdown-option
                    ${option.classBtn}
                    `
                )

                const titleQuotaExceeded = option.classBtn?.includes(
                    'quota-exceeded'
                )
                    ? 'Quota Exceeded to create some activity'
                    : ''

                const isGroup = Array.isArray(option)
                const isSingle = !isGroup

                return (
                    <div className={itemOptionClass} key={option.id}>
                        {uiMode === 'button-action' && (
                            <>
                                {isSingle && (
                                    <Tooltip title={titleQuotaExceeded}>
                                        <ButtonAction
                                            key={option.id}
                                            classBtn={buttonActionClass}
                                            title={option.title}
                                            icon={option.icon}
                                            onClick={() =>
                                                option.onClick(option.id)
                                            }
                                        />
                                    </Tooltip>
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
            })}
        </div>
    )
}

export default Dropdown
