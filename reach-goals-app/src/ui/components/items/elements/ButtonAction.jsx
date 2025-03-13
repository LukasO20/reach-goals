import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { ModalListContext } from '../../../../provider/ModalListProvider'

const statusButton = (classBtn, providervisibleElements) => {
    if (!providervisibleElements) { return false }
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { handleModalList } = useContext(ModalListContext)

    const classBtn = props.classBtn.split(' ')[2]
    const isOn = statusButton(classBtn, visibleElements)
    const navigate = useNavigate()
    const standardRoute = props.standardRoute ?? false

    const handleClick = (e) => {
        if (typeof props.onClick === 'function') {
            props.onClick({props, e}) // execute external function from 'onClick' attribute    
        }
        if (standardRoute) { navigate('/home') } // return standard route if true  

        toggleVisibility(props.target, e)
        handleModalList(props.modalList, e)
    }

    return (
        <label className={`${props.classBtn} button-st ${isOn ? 'on' : ''}`} datavalue={props.datavalue} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            <i className={`icon-st ${props.iconFa}`}></i><span className='button-title'>{props.title}</span>
        </label>
    )
}

export default ButtonAction