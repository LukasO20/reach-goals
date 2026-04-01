import { useParams } from 'react-router-dom'

import { HomeWrapper } from './pages/Home/HomeWrapper.jsx'
import { CalendarWrapper } from './pages/Calendar/CalendarWrapper.jsx'
import { ObjectivesWrapper } from './pages/Objectives/ObjectivesWrapper.jsx'

const sectionRender = (section) => {
    switch (section) {
        case 'home':
            return <HomeWrapper />   
        case 'calendar':
            return <CalendarWrapper />
        case 'objectives':
            return <ObjectivesWrapper />
        default:
            return <Home />
    }
}

const Sections = () => {
    const { section } = useParams()

    return (
        <div className='section'>
            { sectionRender(section) }
        </div>
    )
}

export default Sections