import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

import Button from '../items/elements/Button'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}
const Notification = () => {
    return ReactDOM.createPortal (
        <div className='container-notification aside-content' onClick={(e) => e.stopPropagation()}>
            <h1>Notifications</h1>
            <Button target={targetMap(null)} classBtn='button-action-p close-modal button-st' iconFa='fa-solid fa-xmark'/>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default Notification