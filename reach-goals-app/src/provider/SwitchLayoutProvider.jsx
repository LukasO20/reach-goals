import { useState, useContext, createContext } from 'react'

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

    const updateSwitchLayout = (switcher, e) => {
        e?.stopPropagation()
        update(switcher)
    }

    return (
        <SwitchLayoutContext.Provider value={{ layout, updateSwitchLayout }}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)