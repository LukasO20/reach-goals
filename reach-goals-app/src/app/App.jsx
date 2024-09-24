import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TitleProvider } from '../provider/components/TitleProvider'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
import AppRoutes from './Routes'

import './App.scss'

const App = () => {  
    return (
        <BrowserRouter>
            <TitleProvider>
                <div className="container-app">
                    <ContainerN />
                    <ContainerH />
                    <ContainerM>
                        <AppRoutes />  
                    </ContainerM>
                    <div className='content-center'></div>
                    <div className='content-aside-r'></div>
                </div>
            </TitleProvider>
        </BrowserRouter>
    )
}

export default App