import React, { useState } from 'react'

const SwitchLayoutContext = React.createContext()

const SwitchLayoutProvider = ({children}) => {

    const standardSwitchLayout = () => {
        return {
            home: {
                layout: 'goal'
            },
            objectives: {
                layout: 'default'
            },
            configModal: {
                layout: 'config-theme'
            },
            panel: {
                layout: ''
            }
        }
    }

    const [layoutComponent, setLayoutComponent] = useState(standardSwitchLayout)

    const updateLayoutComponent = (switchLayout) => {
        if (switchLayout) {
            setLayoutComponent({
                ...layoutComponent,
                [switchLayout.nameComponent]: {
                    ...layoutComponent[switchLayout.nameComponent],
                    [switchLayout.nameLayout]: switchLayout.value 
                }
            })
        }
    }

    const switchLayoutComponent = (switchLayout, event) => {
        event?.stopPropagation()
        updateLayoutComponent(switchLayout)
    }

    //console.log('LAYPROVIDER - ', layoutComponent)

    return (
        <SwitchLayoutContext.Provider value={{layoutComponent, switchLayoutComponent}}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export { SwitchLayoutContext, SwitchLayoutProvider }