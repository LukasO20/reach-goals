import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const toggleVisibility = (id, event) => {
        event.stopPropagation()

        const isVisible = visibleElements.includes(id)

        if (isVisible) {
            setVisibleElement([])
        } else {
            setVisibleElement([id])
        }
    }

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }