import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

const Tag = (props) => {
    return ReactDOM.createPortal(
        <div className='container-tag aside-content'>
            <h1>I'm tag</h1>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default Tag
