import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const Button = (props) => {
     const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <label className={`${props.classBtn}`} onClick={(e) => toggleVisibility(props.id, props.classBtn, e)}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
        </label>
    )
}

export default Button