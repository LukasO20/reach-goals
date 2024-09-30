import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TitleProvider } from '../provider/components/TitleProvider'
import { VisibilityProvider } from '../provider/components/VisibilityProvider'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
import AppRoutes from './Routes'
import PanelLeft from '../ui/components/panels/PanelLeft'
import PanelCenter from '../ui/components/panels/PanelCenter'

import './App.scss'
import '../ui/styles/items/Elements.scss'

const App = () => { 
    return (
        <BrowserRouter>
            <TitleProvider>
                <VisibilityProvider>                   
                    <div className="container-app">
                        <ContainerN />
                        <ContainerH />
                        <ContainerM>
                            <AppRoutes />  
                        </ContainerM>
                        <PanelCenter id="panel-center" />
                        <PanelLeft id="panel-left" />
                    </div>
                </VisibilityProvider>
            </TitleProvider>
        </BrowserRouter>
    )
}

export default App