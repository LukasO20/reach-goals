import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

const Notification = (props) => {
    return ReactDOM.createPortal (
        <div className='container-notification aside-content' onClick={(e) => e.stopPropagation()}>
            <h1>Notifications</h1>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default Notification