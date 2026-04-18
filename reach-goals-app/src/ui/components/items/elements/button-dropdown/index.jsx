import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../button-action'
import Dropdown from './dropdown.jsx'

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
    uiMode
}) => {
    const { visibleElements = [] } = useVisibility()

    const isShowDropdown = visibleElements.includes(visibility)

    const buttonActionClass = cx(`${isShowDropdown && 'active'}`)

    return (
        <div className={`button-dropdown-container ${classBtn}`} onClick={(e) => e.stopPropagation()}>
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