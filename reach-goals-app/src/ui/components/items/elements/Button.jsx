import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const statusButton = (classBtn, providervisibleElements) => {
    return providervisibleElements.includes(classBtn)
}

const Button = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const classBtn = props.classBtn.split(' ')[2]
    const isOn = statusButton(classBtn, visibleElements)
    
    return (
        <label className={`${props.classBtn} ${isOn ? 'on' : ''}`} onClick={(e) => toggleVisibility(props.target, e)}>
            <i className={`icon-st ${props.iconFa}`}></i><span className='button-title'>{props.title}</span>
        </label>
    )
}

export default Button