import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider.jsx'

const ButtonLink = (props) => {
    const { switchLayoutComponent } = useContext(SwitchLayoutContext) 

    const handleClick = (e) => {
        if (props.switchLayout) { switchLayoutComponent(props.switchLayout) }
    }

    return (
        <Link to={`${props.link !== undefined ? props.link : '/' }`} onClick={handleClick}>
            <span className={`${props.classBtn} button-st`}><i className={`icon-st ${props.iconFa}`}></i></span>
        </Link>
    )
}

export default ButtonLink