import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const addVisibility = (id, target) => {
        setVisibleElement([id, target])
    }

    const removeVisibility = () => {
        setVisibleElement([])
    }

    const toggleVisibility = (id, target, event) => {
        event.stopPropagation()   
        const isVisible = visibleElements.includes(id)
    
        if (isVisible) { removeVisibility() } 
        else { addVisibility(id, target) }

        console.log(visibleElements)
    }

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }