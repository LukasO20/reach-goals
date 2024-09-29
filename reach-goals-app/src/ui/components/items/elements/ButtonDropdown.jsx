import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)

    return (
        <label className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(props.id, e)}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(props.id) ? 'show' : '' }`}></div>
        </label>
    )
}

export default ButtonDropdown