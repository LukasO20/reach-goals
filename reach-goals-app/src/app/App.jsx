import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TitleProvider } from '../provider/components/TitleProvider'
import { VisibilityProvider, VisibilityContext } from '../provider/components/VisibilityProvider'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
import AppRoutes from './Routes'

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
                        <div className='content-center'></div>
                        <div className='content-aside-r'></div>
                    </div>
                </VisibilityProvider>
            </TitleProvider>
        </BrowserRouter>
    )
}

export default App