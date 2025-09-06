import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

import ButtonAction from '../items/elements/ButtonAction.jsx'
import ButtonDropdown from '../items/elements/ButtonDropdown.jsx'
import ButtonCheckbox from '../items/elements/ButtonCheckbox.jsx'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const checkboxMap = (checkbox) => {
    const data = typeof checkbox === 'object' && checkbox !== null ? true : false  
    if (data) {
        const attributes = {
            id: checkbox.id,
            value: checkbox.value ?? false
        }

        return attributes
    }
    return null
}

const Notification = () => {
    return null
    // return ReactDOM.createPortal (
    //     <div className='container-notification aside-content' onClick={(e) => e.stopPropagation()}>
    //         <div className='header'>
    //             <h2>Notifications</h2>
    //             <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
    //             <div className='options'>
    //                 <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-noti', value: false })} classBtn='checkbox-r-noti btn-checkbox'/>
    //                 <ButtonDropdown target={targetMap('btn-filter-notification', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/>
    //                 <ButtonAction target={targetMap(['panel-center', 'config'])} classBtn='btn-option-r config-content' iconFa='fa-solid fa-sliders'/>
    //             </div>
    //         </div>
    //         <div className='body'>
    //             <Outlet/>
    //         </div>
    //     </div>, document.querySelector('.content-aside-r')
    // )
}

export default Notification