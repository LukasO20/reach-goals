import { useParams } from 'react-router-dom'

import { HomeWrapper } from './pages/home/home-wrapper.jsx'
import { CalendarWrapper } from './pages/calendar/calendar-wrapper.jsx'
import { ObjectivesWrapper } from './pages/objectives/objectives-wrapper.jsx'

const sectionRender = (section) => {
    switch (section) {
        case 'home':
            return <HomeWrapper />   
        case 'calendar':
            return <CalendarWrapper />
        case 'objectives':
            return <ObjectivesWrapper />
        default:
            return <HomeWrapper />
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