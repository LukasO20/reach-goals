import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'
import { CheckboxProvider, useBool } from '../../../../provider/components/CheckboxProvider'

const statusButton = (classBtn, providervisibleElements) => {
    return providervisibleElements.includes(classBtn)
}

const ButtonCheckbox = (props) => {
    //const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    // const classBtn = props.classBtn.split(' ')[1]
    // const isOn = statusButton(classBtn, visibleElements)
    // ${isOn ? 'checked' : 'no-checked'}
    // ${isOn ? 'fa-check' : ''}
    const { toggleValueByID } = useBool()


    return (
        <label className={`${props.classBtn} button-st `} onClick={(e) => toggleValueByID(props.checkbox)}>
            <label className='checkbox-container'>
                <i className={`icon-st fa-solid `}></i>
            </label>
        </label>
    )
}

export default ButtonCheckbox