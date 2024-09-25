import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [isVisible, set] = useState(false)
    const toggleVisibility = () => { set(!isVisible) }

    return (
        <VisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }