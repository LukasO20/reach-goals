import { Routes, Route, Navigate } from 'react-router-dom'

import { useSwitchLayout } from '../provider/SwitchLayoutProvider.jsx'

import Sections from '../ui/components/SectionLayout'
import ModalSwitcherRight from '../ui/components/modals/ModalSwitcherRight.jsx'

const AppRoutes = () => {
    const { layoutComponent } = useSwitchLayout()

    const typeLayout = layoutComponent.panel.layout

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/:section' element={<Sections />}>
                <Route path={`modal-right/${typeLayout}`} element={<ModalSwitcherRight />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes