import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const ButtonDropdown = (props) => {
    const { isVisible } = useContext(VisibilityContext)
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <label className={`${props.classBtn} button-st ${ isVisible ? 'show' : ''}`} onClick={toggleVisibility}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className='dropdown'></div>
        </label>
    )
}

export default ButtonDropdown