import { useState, useContext, createContext, useCallback, useMemo } from 'react'

import { usePersistedUserConfig } from '../../hooks/usePersistedUserConfig'

import { switchLayoutMap } from '../../utils/mapping/mappingUtilsProvider'
import { persistedUserConfigKeysMap, persistedUserConfigMap } from '../../utils/mapping/mappingUtils'

const SwitchLayoutContext = createContext()

export const SwitchLayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState(switchLayoutMap)
    const [uiVisibility, setVisibility] = usePersistedUserConfig(persistedUserConfigKeysMap.visibility, persistedUserConfigMap.visibility)

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

    //TODO: CHANGE NAME TO SET BESIDES UDPATE
    const updateSwitchLayout = useCallback(({ area, state }, e) => {
        e?.stopPropagation()
        update({ area, state })
    }, [])

    const setUserConfigLayout = useCallback(({ type, data }) => {
            if (type === 'visibility' && typeof data === 'object') 
                setVisibility({ ...uiVisibility, ...data })

            return null
        }, [setVisibility])

    const output = {
        layout,
        visibility: uiVisibility,
    }

    console.log('SWITCH - ', output)

    const value = useMemo(() => ({ data: output, updateSwitchLayout, setUserConfigLayout }), [layout, updateSwitchLayout, setUserConfigLayout])

    return (
        <SwitchLayoutContext.Provider value={value}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)