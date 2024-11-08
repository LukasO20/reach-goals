import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

const statusButton = (classBtn, providervisibleElements) => {
    return providervisibleElements.includes(classBtn)
}

const ButtonCheckbox = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const classBtn = props.classBtn.split(' ')[1]
    const isOn = statusButton(classBtn, visibleElements)
    
    return (
        <label className={`${props.classBtn} button-st ${isOn ? 'checked' : 'no-checked'}`} onClick={(e) => toggleVisibility(props.target, e)}>
            <label className='checkbox-container'>
                <i className={`icon-st fa-solid ${isOn ? 'fa-check' : ''}`}></i>
            </label>
        </label>
    )
}

export default ButtonCheckbox