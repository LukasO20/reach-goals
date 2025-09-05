import { Routes, Route, Navigate } from 'react-router-dom'

import Sections from '../ui/components/SectionLayout'
import ModalTag from '../ui/components/panels/ModalTag'
import Notification from '../ui/components/panels/Notification'
import ModalDetails from '../ui/components/panels/ModalDetails'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/:section' element={<Sections />}>
                <Route path='tag' element={<ModalTag />} />
                <Route path='notification' element={<Notification />} />
                <Route path='details' element={<ModalDetails />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes