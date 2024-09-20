import React from 'react'
import { useParams, Outlet } from 'react-router-dom'

import Home from './Home'
import Calendar from './Calendar'
import Objectives from './Objectives'

const Sections = (props) => {
    const { section } = useParams()

    let componentRender
    switch (section) {
        case 'home':
            componentRender = <Home />
            break
        case 'calendar':
            componentRender = <Calendar />
            break
        case 'objectives':
            componentRender = <Objectives />
            break
    }

    return (
        <div className='container-dynamic'>
            {componentRender}
            <Outlet />
        </div>
    )
}

export default Sections