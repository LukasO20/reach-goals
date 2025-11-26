import { useState, useContext, createContext } from 'react'

const SwitchLayoutContext = createContext()

export const SwitchLayoutProvider = ({ children }) => {
    const standardSwitchLayout = () => {
        return {
            page: 'home',
            home: {
                layout: 'goal',
            },
            calendar: {
                layout: 'default'
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
                page: switchLayout.page ?? layoutComponent.page,
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
        <SwitchLayoutContext.Provider value={{ layoutComponent, switchLayoutComponent }}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)