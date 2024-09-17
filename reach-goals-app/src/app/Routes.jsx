import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../ui/components/Home'
import Objectives from '../ui/components/Objectives'
import Calendar from '../ui/components/Calendar'

import Config from '../ui/components/Config'
import Tag from '../ui/components/Tag'
import Notification from '../ui/components/Notification'

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />}/>
            <Route path='/home' element={<Home/>}>
                <Route path='config' element={<Config />}/>
                <Route path='tag' element={<Tag />}/>
                <Route path='notification' element={<Notification />}/>
            </Route>
            <Route path='/calendar' element={<Calendar />}>
                <Route path='config' element={<Config />}/>
                <Route path='tag' element={<Tag />}/>
                <Route path='notification' element={<Notification />}/>
            </Route>
            <Route path='/objectives' element={<Objectives/>}>
                <Route path='config' element={<Config />}/>
                <Route path='tag' element={<Tag />}/>
                <Route path='notification' element={<Notification />}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes