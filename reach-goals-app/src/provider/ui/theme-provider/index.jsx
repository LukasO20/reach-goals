import { createContext, useMemo, useContext } from 'react'
import { usePersistedUserConfig } from '../../../hooks/usePersistedUserConfig'

import { persistedUserConfigKeysMap, persistedUserConfigMap } from '../../../utils/mapping/mappingUtils.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').ThemeContextValue} ThemeContextValue */

/** @type {React.Context<ThemeContextValue>} */
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    /** @type {import('./types.js').SetThemeStateProps} */
    const [theme, setTheme] = usePersistedUserConfig(persistedUserConfigKeysMap.theme, persistedUserConfigMap.theme)

    const output = useMemo(() => {
        return theme
    }, [theme])

    const value = useMemo(() => ({ theme: output, setTheme }), [setTheme, output])
    
    //console.log('ThemeProvider - output:', output)

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)