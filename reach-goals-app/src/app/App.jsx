import { useTheme } from '../provider/ui/theme-provider'

import AppWrapper from './AppWrapper'

import './App.scss'

const App = () => {
    const { theme } = useTheme()

    return (
        <div className='container-app' data-theme={theme}>
            <AppWrapper />
        </div>
    )
}

export default App
