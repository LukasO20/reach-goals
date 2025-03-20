import React, { useState } from 'react'

const SwitchLayoutContext = React.createContext()

const SwitchLayoutProvider = ({children}) => {

    const standardSwitchLayout = () => {
        return [
            home = {
                layout: 'goal'
            },
            configModal = {
                layout: 'config-theme'
            }
        ]
    }

    const [layoutComponent, setLayoutComponent] = useState(standardSwitchLayout)

    const storageElement = () => {

    }

    const setSafeLayoutComponent = (updateFn) => {
        setLayoutComponent((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }

    const updateLayoutComponent = (switchLayout) => {
        setSafeLayoutComponent((prev) => {

            if (switchLayout) {
                let filter = [...prev]
                filter.push(switchLayout)

                return switchLayout
            }
        })
    }

    const switchLayoutComponent = (switchLayout, event) => {
        console.log('ALVO - ', target)

        event.stopPropagation()
        updateLayoutComponent(switchLayout)
    }

    return (
        <SwitchLayoutContext.Provider value={{layoutComponent, switchLayoutComponent}}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export { SwitchLayoutContext, SwitchLayoutProvider }