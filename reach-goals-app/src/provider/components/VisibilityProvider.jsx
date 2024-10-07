import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const toggleVisibility = (id, event) => {
        event.stopPropagation()
        
        //const isVisible = visibleElements.includes(id)

        const isVisible = visibleElements.some(item => {
            if (Array.isArray(id)) {
                console.log('IS ARRAY', id.includes(item))
                return id.includes(item)

            } else {
                console.log('IS OBJECT', id === item)
                return id === item
            }
        })

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