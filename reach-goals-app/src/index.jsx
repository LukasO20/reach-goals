import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import ProviderApp from './provider/ProviderApp.jsx'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProviderApp>
                <App />
            </ProviderApp>
        </BrowserRouter>
    </React.StrictMode>
)
