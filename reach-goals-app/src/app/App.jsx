import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp.jsx'
import AppRoutes from './Routes.jsx'

import ContainerN from '../ui/components/Navigate.jsx'
import ContainerH from '../ui/components/ContainerHeader.jsx'
import ContainerM from '../ui/components/ContainerMain.jsx'
import Panel from '../ui/components/panels/Panel.jsx'

import './App.scss'
import '../ui/styles/items/Elements.scss'

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