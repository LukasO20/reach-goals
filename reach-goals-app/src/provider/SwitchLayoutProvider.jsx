import { useState, useContext, createContext, useCallback, useMemo } from 'react'

import { switchLayoutMap } from '../utils/mapping/mappingUtilsProvider'

const SwitchLayoutContext = createContext()

export const SwitchLayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState(switchLayoutMap)
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

    const updateSwitchLayout = useCallback(({ area, state }, e) => {
        e?.stopPropagation()
        update({ area, state })
    }, [])

    const value = useMemo(() => ({ layout, updateSwitchLayout }), [layout, updateSwitchLayout])

    return (
        <SwitchLayoutContext.Provider value={value}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)