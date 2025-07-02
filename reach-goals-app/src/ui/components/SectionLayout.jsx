import { useParams, Outlet } from 'react-router-dom'
import { useContext } from 'react'

import { PageTypeContext } from '../../provider/PageTypeProvider.jsx'

import Home from './pages/Home.jsx'
import Calendar from './pages/Calendar.jsx'
import Objectives from './pages/Objectives.jsx'

const Sections = () => {
    const { section } = useParams()
    const { setPageType } = useContext(PageTypeContext)

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

    setPageType(section)

    return (
        <div className='container-dynamic'>
            {componentRender}
            <Outlet />
        </div>
    )
}

export default Sections