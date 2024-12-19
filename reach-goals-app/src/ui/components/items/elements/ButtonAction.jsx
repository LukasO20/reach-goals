import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const statusButton = (classBtn, providervisibleElements) => {
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const classBtn = props.classBtn.split(' ')[2]
    const isOn = statusButton(classBtn, visibleElements)
    const navigate = useNavigate()
    const standardRoute = props.standardRoute ?? false

    const handleCLick = (e) => {
        if (typeof props.onClick === 'function') {
            props.onClick() // execute external function from 'onClick' attribute
        }
        if (standardRoute) { navigate('/home') } // return standard route if true  
        toggleVisibility(props.target, e)
    }

    return (
        <label className={`${props.classBtn} button-st ${isOn ? 'on' : ''}`} onClick={handleCLick}>
            <i className={`icon-st ${props.iconFa}`}></i><span className='button-title'>{props.title}</span>
        </label>
    )
}

export default ButtonAction