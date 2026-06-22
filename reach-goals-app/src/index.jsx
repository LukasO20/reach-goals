import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { ThemeProvider } from './provider/ui/theme-provider/index.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)