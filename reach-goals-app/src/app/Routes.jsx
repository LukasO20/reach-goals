import { Routes, Route, Navigate } from 'react-router-dom'

import { HomeWrapper } from '../ui/pages/home/home-wrapper'
import { CalendarWrapper } from '../ui/pages/calendar/calendar-wrapper'
import { ObjectivesWrapper } from '../ui/pages/objectives/objectives-wrapper'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomeWrapper />} />
            <Route path='/calendar' element={<CalendarWrapper />} />
            <Route path='/objectives' element={<ObjectivesWrapper />} />
        </Routes>
    )
}

export default AppRoutes