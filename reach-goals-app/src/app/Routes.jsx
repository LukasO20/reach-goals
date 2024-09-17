import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../ui/components/Home'
import Objectives from '../ui/components/Objectives'

import Calendar from '../ui/components/Calendar'
import Config from '../ui/components/Config'

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />}/>
            <Route path='/home/*' element={<Home/>}>
                <Route path='config' element={<Config />}/>
            </Route>
            <Route path='/objectives/*' element={<Objectives/>}>
                <Route path='config' element={<Config />}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes