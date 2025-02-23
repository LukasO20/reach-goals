import React, { useState } from 'react'

const VisibilityContext = React.createContext()

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const updateVisibility = (target) => {
        setVisibleElement((prev) => {
            const classType = Array.isArray(target.class)

            if (classType) {
                let filter = [...prev]

                if (target.operator.add) {
                    filter = filter.slice(0, 2)
                    filter.push(...target.class)
                    return filter
                }

                if (target.operator.remove) {
                    if (target.class) {
                        filter = filter.filter(classPrevious => target.class.some(el => el !== classPrevious))
                    } 

                    filter.pop()
                    return filter
                }

                return target.class
            }
        })
    }

    const removeVisibility = (target) => {
        setVisibleElement((prev) => {
            const classType = Array.isArray(target.class)      
            if (classType) { 
                if (target.operator.maintain) {
                    return target.class
                }

                return prev.filter(classPrevious => target.class.some(el => el !== classPrevious))
            }
        })
    }

    const toggleVisibility = (target, event) => {
        console.log('ALVO - ', target)

        event.stopPropagation()
        const parameterTarget = {
            class: target?.class ?? null,
            operator: {
                add: target?.operator?.add ?? false,
                remove: target?.operator?.remove ?? false,
                maintain: target?.operator?.maintain ?? false
            }
        }
        const isVisible = visibleElements.some(classes => {
            const classType = Array.isArray(parameterTarget.class)

            if (classType) {
                return parameterTarget.class.includes(classes)
            }
        })
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