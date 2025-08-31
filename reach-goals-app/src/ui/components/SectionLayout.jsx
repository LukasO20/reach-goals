import { useParams, Outlet } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Calendar from './pages/Calendar.jsx'
import Objectives from './pages/Objectives.jsx'

const sectionRender = (section) => {
    switch (section) {
        case 'home':
            return <Home />   
        case 'calendar':
            return <Calendar />
        case 'objectives':
            return <Objectives />
        default:
            return <Home />
    }
}

const Sections = () => {
    const { section } = useParams()

    return (
        <div className='container-dynamic'>
            {sectionRender(section)}
            {/* <Outlet /> */}
        </div>
    )
}

export default Sections