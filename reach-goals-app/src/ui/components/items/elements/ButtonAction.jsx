import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { ModalListContext } from '../../../../provider/ModalListProvider'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'
import { ManageModelContext } from '../../../../provider/ManageModelProvider'

const statusButton = (classBtn, providervisibleElements) => {
    if (!providervisibleElements) { return false }
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)
    const { handleModalList } = useContext(ModalListContext)
    const { selectModel, setSelectModel } = useContext(ManageModelContext)

    const classBtn = props.classBtn.split(' ')[2]
    const isOn = statusButton(classBtn, visibleElements)
    const navigate = useNavigate()
    const standardRoute = props.standardRoute ?? false

    const handleClick = (e) => {
        if (typeof props.onClick === 'function') {
            props.onClick({props, e}) // execute external function from 'onClick' attribute    
        }
        if (standardRoute) { navigate('/home') } // return standard route if true  

        if (props.target) { toggleVisibility(props.target, e) }
        if (props.modalList) { handleModalList(props.modalList, e) }
        if (props.switchLayout) { switchLayoutComponent(props.switchLayout) }
        if (props.nullModel) { setSelectModel(null) }
    }

    return (
        <span className={`${props.classBtn} button-st ${isOn ? 'on' : ''}`} datavalue={props.datavalue} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            <i className={`icon-st ${props.iconFa}`}></i><span className='button-title'>{props.title}</span>
        </span>
    )
}

export default ButtonAction