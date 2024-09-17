import React from 'react'
import { Outlet } from 'react-router-dom'

const Calendar = (props) => {
    return (
        <div className="container-calendar">
            <h1>Hi, I'm calendar mode</h1>
            <Outlet/>
    </div> 
    )
}

export default Calendar