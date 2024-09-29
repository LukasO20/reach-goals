import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const ButtonDropdown = (props) => {
    const { toggleVisibility } = useContext(VisibilityContext)
    const { visibleElements }  = useContext(VisibilityContext)

    return (
        <label className={`${props.classBtn} button-st`} onClick={() => toggleVisibility(props.id)}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(props.id) ? 'show' : '' }`}></div>
        </label>
    )
}

export default ButtonDropdown