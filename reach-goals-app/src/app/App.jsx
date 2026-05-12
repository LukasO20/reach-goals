import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import Navigate from '../ui/navigate' 
import ContainerHeader from '../ui/containers/container-header'
import ContainerMain from '../ui/containers/container-main'
import MessageToast from '../ui/items/elements/message-toast'
import ModalSwitcherCenter from '../ui/modals/modal-switcher-center.jsx'
import ModalSwitcherRight from '../ui/modals/modal-switcher-right.jsx'

import './App.scss'

const App = () => (
    <BrowserRouter>
        <ProviderApp>
            <div className="container-app">
                <Navigate />
                <ContainerHeader />
                <ContainerMain>
                    <AppRoutes />
                </ContainerMain>
                <MessageToast />
                <ModalSwitcherCenter />
                <ModalSwitcherRight />
            </div>
        </ProviderApp>
    </BrowserRouter>
)

export default App