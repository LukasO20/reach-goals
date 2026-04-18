import { Routes, Route, Navigate } from 'react-router-dom'

import Sections from '../ui/components/sections'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/:section' element={<Sections />} />
        </Routes>
    )
}

export default AppRoutes