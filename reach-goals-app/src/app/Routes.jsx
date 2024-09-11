import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../ui/components/Home'
import Objectives from '../ui/components/Objectives'
import Calendar from '../ui/components/Calendar'
import Config from '../ui/components/Config'

export default props => 
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Navigate to="/" />}/>
        <Route  path='/objectives' element={<Objectives />}/>
        <Route path="/calendar" element={<Calendar /> } />
        <Route path="/config" element={<Config /> } />
    </Routes>