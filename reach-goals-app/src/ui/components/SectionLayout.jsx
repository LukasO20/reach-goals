import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useSwitchLayout } from '../../provider/SwitchLayoutProvider.jsx'

import Home from './pages/Home/Home.jsx'
import Calendar from './pages/Calendar/Calendar.jsx'
import Objectives from './pages/Objectives/Objectives.jsx'

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
    const { switchLayoutComponent } = useSwitchLayout()

    useEffect(() => {
        switchLayoutComponent({ page: section })
    }, [section])

    return (
        <div className='section'>
            { sectionRender(section) }
        </div>
    )
}

export default Sections