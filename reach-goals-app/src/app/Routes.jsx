import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Sections from '../ui/components/SectionLayout'
import Tag from '../ui/components/panels/Tag'
import Notification from '../ui/components/panels/Notification'
import Details from '../ui/components/panels/Details'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />}/>

            <Route path='/:section' element={<Sections />}>
                <Route path='tag' element={<Tag />}/>
                <Route path='notification' element={<Notification />}/>
                <Route path='details' element={<Details />}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes