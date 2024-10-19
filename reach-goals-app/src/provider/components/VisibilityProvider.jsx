import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const updateVisibility = (target) => {
        setVisibleElement((prev) => {
            if (target.itself) {
                const filter = [...prev.filter(id => id)].slice(0, 2)
                return [...filter, target.idTarget, target.typeTarget]
            }
            return [target.idTarget, target.typeTarget]
        })
    }

    const removeVisibility = (target) => {
        setVisibleElement((prev) => {
            if (target.itself) {
                return prev.filter(id => id !== target.idTarget && id)
            }
            return []
        })
    }

    const toggleVisibility = (target, event) => {
        event.stopPropagation()
        const parameterTarget = target ?? {idTarget: null, typeTarget: null, itself: false}
        const isVisible = visibleElements.includes(parameterTarget.idTarget);

        isVisible ? removeVisibility(parameterTarget) : updateVisibility(parameterTarget)
    }

    console.log('VISIBLES - ', visibleElements)

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }