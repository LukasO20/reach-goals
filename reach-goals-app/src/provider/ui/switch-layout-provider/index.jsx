import { useState, useContext, createContext, useCallback, useMemo } from 'react'

import { usePersistedUserConfig } from '../../../hooks/usePersistedUserConfig'

import { switchLayoutMap } from '../../../utils/mapping/mappingUtilsProvider'
import { persistedUserConfigKeysMap, persistedUserConfigMap } from '../../../utils/mapping/mappingUtils'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').SwitchLayoutContextValue} SwitchLayoutContextValue */

/** @type {React.Context<SwitchLayoutContextValue>} */
const SwitchLayoutContext = createContext()

export const SwitchLayoutProvider = ({ children }) => {
    /** @type {import('./types.js').SetLayoutStateProps} */
    const [layout, setLayout] = useState(switchLayoutMap)

    /** @type {import('./types.js').SetVisibilityStateProps} */
    const [uiVisibility, setVisibility] = usePersistedUserConfig(persistedUserConfigKeysMap.visibility, persistedUserConfigMap.visibility)

       /** @type {import('./types.js').UpdateProps} */ 
    const update = (switcher) => {
        if (switcher.area && switcher.state) {
            setLayout((prev) => ({
                ...prev,
                [switcher.area]: {
                    ...prev[switcher.area],
                    ...switcher.state
                }
            }))
        }
    }

    /** @type {import('./types.js').SetSwitchLayoutProps} */
    const setSwitchLayout = useCallback(({ area, state }, e) => {
        e?.stopPropagation()
        update({ area, state })
    }, [])

    /** @type {import('./types.js').SetUserConfigLayoutProps} */
    const setUserConfigLayout = useCallback(({ type, data }) => {
        if (typeof data === 'object') {
            const isStatusKey = Object.keys(data)[0] === 'status'

            if (isStatusKey) {
                const hasStatus = uiVisibility.status?.some(status => data.status.includes(status))
                setVisibility({
                    ...uiVisibility, status: hasStatus ?
                        uiVisibility.status.filter(status => !data.status.includes(status)) :
                        [...uiVisibility.status, ...data.status]
                })
            }

            if (type === 'visibility' && !isStatusKey) setVisibility({ ...uiVisibility, ...data })
        }

        return null
    }, [setVisibility, uiVisibility])

    /** @type {import('./types.js').OutputProps} */
    const output = useMemo(() => {
        return {
            layout,
            visibility: uiVisibility,
        }
    }, [layout, uiVisibility])

    const value = useMemo(() => ({ data: output, setSwitchLayout, setUserConfigLayout }), [setSwitchLayout, setUserConfigLayout, output])

    //console.log('SwitchLayoutProvider - output:', output)

    return (
        <SwitchLayoutContext.Provider value={value}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)