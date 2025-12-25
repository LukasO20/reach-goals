import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import ContainerN from '../ui/components/navigate/Navigate.jsx'
import ContainerH from '../ui/components/containers/containerheader/ContainerHeader.jsx'
import ContainerM from '../ui/components/containers/containermain/ContainerMain.jsx'
import MessageToast from '../ui/components/items/elements/MessageToast/MessageToast.jsx'
import ModalSwitcherCenter from '../ui/components/modals/ModalSwitcherCenter.jsx'
import ModalSwitcherRight from '../ui/components/modals/ModalSwitcherRight.jsx'

import './App.scss'

const App = () => (
    <BrowserRouter>
        <ProviderApp>
            <div className="container-app">
                <ContainerN />
                <ContainerH />
                <ContainerM>
                    <AppRoutes />
                </ContainerM>
                <MessageToast />
                <ModalSwitcherCenter />
                <ModalSwitcherRight />
            </div>
        </ProviderApp>
    </BrowserRouter>
)

export default App