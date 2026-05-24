import { useRef } from 'react'
import { useOutsideClick } from '../../../../hooks/useOutsideClick.js'
import { useVisibility } from '../../../../provider/ui/visibility-provider'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider/index.jsx'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../utils/utils.js'

import Dropdown from './components/dropdown'
import ButtonAction from '../button-action'
import DropdownVisibilityCount from './components/dropdown-visibility-count.jsx'

import './style.scss'

/** @typedef {import('./types.js').ButtonDropdownProps} Props */

/**
 * @param {Props} props
 */
const ButtonDropdown = ({
    options,
    visibility,
    visibilityOperator,
    icon,
    classBtn,
    classBtnAction,
    title,
    uiMode,
    renderTopChildren
}) => {
    const { visibleElements = [], toggleVisibility } = useVisibility()
    const { data: { visibility: switchLayoutVisibility } } = useSwitchLayout()
    const buttonDropdownRef = useRef(null)

    const isShowDropdown = visibleElements.includes(visibility)

    const buttonActionClass = cx(`${isShowDropdown && 'active'}`)

    useOutsideClick(buttonDropdownRef, () => {
        if (isShowDropdown) toggleVisibility(visibilityMap(visibility, { remove: true }))
    })

    return (
        <div className={`button-dropdown-container ${classBtn}`} ref={buttonDropdownRef}>
            {renderTopChildren && (
                <DropdownVisibilityCount tagsCard={switchLayoutVisibility.tagsCard} status={switchLayoutVisibility.status} />
            )}
            <ButtonAction
                classBtn={`${buttonActionClass} ${classBtnAction ?? 'plan max-width'}`}
                visibility={visibilityMap(visibility, visibilityOperator)}
                title={title}
                icon={icon}
            />
            {isShowDropdown && (<Dropdown options={options} uiMode={uiMode} />)}
        </div>
    )
}

export default ButtonDropdown