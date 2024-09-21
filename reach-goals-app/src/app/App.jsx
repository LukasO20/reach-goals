import React from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'

import ContainerN from '../ui/components/navigation/Navigate'
import ContainerH from '../ui/components/pages/ContainerHeader'
import ContainerM from '../ui/components/pages/ContainerMain'
import AppRoutes from './Routes'

import './App.scss'

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="container-app">
                <ContainerN />
                <ContainerH />
                <ContainerM>
                    <AppRoutes />    
                </ContainerM>
                <div className='content-center'></div>
                <div className='content-aside-r'></div>
            </div>
        </BrowserRouter>
    )
}

export default App