import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import ContainerN from '../ui/components/navigate/Navigate.jsx'
import ContainerH from '../ui/components/containers/ContainerHeader/ContainerHeader.jsx'
import ContainerM from '../ui/components/containers/ContainerMain/ContainerMain.jsx'
import Panel from '../ui/components/panels/Panel.jsx'

import './App.scss'
import '../ui/styles/elements.scss'

const App = () => (
    <BrowserRouter>
        <ProviderApp>
            <div className="container-app">
                <ContainerN />
                <ContainerH />
                <ContainerM>
                    <AppRoutes />
                </ContainerM>
                <Panel />
            </div>
        </ProviderApp>
    </BrowserRouter>
)

export default App