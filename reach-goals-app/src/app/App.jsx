import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import Navigate from '../ui/components/Navigate'

import './App.scss'

export default props => 
    <BrowserRouter>
        <div className="app">
            <Navigate />
            <Routes />        
        </div>
    </BrowserRouter>