import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Dropdown from './Dropdown.jsx'

import '../ButtonDropdown/ButtonDropdown.scss'

/**
 * @typedef {object} DropdownOption
 * @property {string} title
 * @property {string} icon
 * @property {string} classBtn
 * @property {function} onClick
 */

/**
 * @param {Object} props
 * @param {DropdownOption[]} props.options
 * @param {string} props.visibility
 * @param {object} props.visibilityOperator
 * @param {string} props.icon
 * @param {string} props.classBtn
 * @param {string} props.classBtnAction
 * @param {string} props.title
 * @param {string} props.uiMode
 * @param {boolean} props.arrow
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