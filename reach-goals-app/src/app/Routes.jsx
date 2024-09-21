import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Sections from '../ui/components/SectionLayout'
import Config from '../ui/components/panels/Config'
import Tag from '../ui/components/panels/Tag'
import Notification from '../ui/components/panels/Notification'
import Details from '../ui/components/panels/Details'

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />}/>

            <Route path='/:section' element={<Sections />}>
                <Route path='config' element={<Config />} />
                <Route path='tag' element={<Tag />}>
                    <Route path='config' element={<Config />} />
                </Route>
                <Route path='notification' element={<Notification />}>
                    <Route path="config" element={<Config />} />
                </Route>
                <Route path='details' element={<Details />}>
                    <Route path="config" element={<Config />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes