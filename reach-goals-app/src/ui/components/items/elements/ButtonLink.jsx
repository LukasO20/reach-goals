import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const ButtonLink = (props) => {

    return (
        <Link to={`${props.link !== undefined ? props.link : '/' }`}>
            <span className={`${props.classBtn} button-st`}><i className={`icon-st ${props.iconFa}`}></i></span>
        </Link>
    )
}

export default ButtonLink