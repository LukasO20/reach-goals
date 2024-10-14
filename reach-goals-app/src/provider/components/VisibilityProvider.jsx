import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const addVisibility = (id, type) => {
        setVisibleElement([id, type.id])
    }

    const removeVisibility = () => {
        setVisibleElement([])
    }

    const toggleVisibility = (id, type, event) => {
        event.stopPropagation()

        const isVisible = visibleElements.includes(id)
        const parameterType = type ?? {id: null, idHelper: null}

        if (isVisible) { removeVisibility() } 
        else { addVisibility(id, parameterType) }

        console.log(visibleElements)
    }

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }