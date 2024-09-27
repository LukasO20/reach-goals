import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const ButtonDropdown = (props) => {
    const { elementID, setElement } = useContext(VisibilityContext)
    const handleClick = () => { setElement(props.id) }

    return (
        <label className={`${props.classBtn} button-st ${ elementID === props.id ? 'show' : ''}`} onClick={handleClick}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className='dropdown-menu'></div>
        </label>
    )
}

export default ButtonDropdown