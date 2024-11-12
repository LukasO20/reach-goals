import React from 'react'
import { useBool } from '../../../../provider/components/CheckboxProvider'

const statusButton = (classBtn, dataCheckboxProvider) => {
    return dataCheckboxProvider.some(item => item.id === classBtn && item.value)
}

const ButtonCheckbox = (props) => {
    const { valuesCheckbox, toggleValueByID } = useBool()
    const classBtn = props.classBtn.split(' ')[0]
    const isChecked = statusButton(classBtn, valuesCheckbox)

    return (
        <label className={`${props.classBtn} button-st ${isChecked ? 'checked' : ''}`} onClick={(e) => toggleValueByID(props.checkbox)}>
            <label className='checkbox-container'>
                <i className={`icon-st fa-solid ${isChecked ? 'fa-check' : ''}`}></i>
            </label>
        </label>
    )
}

export default ButtonCheckbox