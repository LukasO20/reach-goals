import { BrowserRouter } from 'react-router-dom'

import { useTheme } from '../provider/ui/theme-provider'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import Navigate from '../ui/navigate'
import ContainerHeader from '../ui/containers/container-header'
import ContainerMain from '../ui/containers/container-main'
import MessageToast from '../ui/elements/message-toast'
import ModalSwitcherCenter from '../ui/modals/modal-switcher-center.jsx'
import ModalSwitcherRight from '../ui/modals/modal-switcher-right.jsx'

import './App.scss'

const App = () => {
    const { theme } = useTheme()

    return (
        <BrowserRouter>
            <div className='container-app' data-theme={theme}>
                <ProviderApp>
                    <Navigate />
                    <ContainerHeader />
                    <ContainerMain>
                        <AppRoutes />
                    </ContainerMain>
                    <MessageToast />
                    <ModalSwitcherCenter />
                    <ModalSwitcherRight />
                </ProviderApp>
            </div>
        </BrowserRouter>
    )
}

export default App