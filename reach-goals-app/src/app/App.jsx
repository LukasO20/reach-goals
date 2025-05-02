import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TitleProvider } from '../provider/TitleProvider'
import { VisibilityProvider } from '../provider/VisibilityProvider'
import { CheckboxProvider } from '../provider/CheckboxProvider'
import { ManageModelProvider } from '../provider/ManageModelProvider'
import { ModalListProvider } from '../provider/ModalListProvider'
import { SwitchLayoutProvider } from '../provider/SwitchLayoutProvider'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
import AppRoutes from './Routes'
import PanelLeft from '../ui/components/panels/PanelLeft'
import PanelCenter from '../ui/components/panels/PanelCenter'
import Panel from '../ui/components/panels/Panel'

import './App.scss'
import '../ui/styles/items/Elements.scss'

const App = () => { 
    return (
        <BrowserRouter>
            <TitleProvider>
                <VisibilityProvider>     
                    <CheckboxProvider>
                        <ManageModelProvider>
                            <ModalListProvider>
                                <SwitchLayoutProvider>
                                    <div className="container-app">
                                        <ContainerN />
                                        <ContainerH />
                                        <ContainerM>
                                            <AppRoutes />  
                                        </ContainerM>
                                        {/* <PanelCenter id="panel-center" />
                                        <PanelLeft id="panel-left" /> */}
                                        <Panel />
                                    </div>
                                </SwitchLayoutProvider>
                            </ModalListProvider>
                        </ManageModelProvider>
                    </CheckboxProvider>              
                </VisibilityProvider>
            </TitleProvider>
        </BrowserRouter>
    )
}

export default App