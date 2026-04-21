import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import Navigate from '../ui/components/navigate' 
import ContainerHeader from '../ui/components/containers/container-header'
import ContainerMain from '../ui/components/containers/container-main'
import MessageToast from '../ui/components/items/elements/message-toast'
import ModalSwitcherCenter from '../ui/components/modals/modal-switcher-center.jsx'
import ModalSwitcherRight from '../ui/components/modals/modal-switcher-right.jsx'

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