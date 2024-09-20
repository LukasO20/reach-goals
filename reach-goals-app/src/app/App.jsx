import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ContainerN from '../ui/components/Navigate'
import ContainerH from '../ui/components/ContainerHeader'
import ContainerM from '../ui/components/ContainerMain'
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