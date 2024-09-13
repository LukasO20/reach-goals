import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ContainerM from '../ui/components/ContainerMain'
import ContainerH from '../ui/components/ContainerHeader'
import Navigate from '../ui/components/Navigate'

import './App.scss'

export default props => 
    <BrowserRouter>
        <div className="app">
            <Navigate />
            <ContainerH />
            <ContainerM />
        </div>
    </BrowserRouter>