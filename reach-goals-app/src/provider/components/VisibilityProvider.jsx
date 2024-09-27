import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [elementID, setElement] = useState(null)

    return (
        <VisibilityContext.Provider value={{ elementID, setElement }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }