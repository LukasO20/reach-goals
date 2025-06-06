import { BrowserRouter } from 'react-router-dom'

import ProviderApp from '../provider/ProviderApp'
import AppRoutes from './Routes'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
import Panel from '../ui/components/panels/Panel'

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