import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

const Details = (props) => {
    return ReactDOM.createPortal (
        <div className='container-details aside-content'>
            <h1>I'm details of assignments and goals</h1>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default Details