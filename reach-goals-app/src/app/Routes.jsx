import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Sections from '../ui/components/SectionLayout'
import Config from '../ui/components/Config'
import Tag from '../ui/components/Tag'
import Notification from '../ui/components/Notification'

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />}/>

            <Route path="/:section" element={<Sections />}>
                <Route path="config" element={<Config />} />
                <Route path="tag" element={<Tag />}>
                    <Route path="config" element={<Config />} />
                </Route>
                <Route path="notification" element={<Notification />}>
                    <Route path="config" element={<Config />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes