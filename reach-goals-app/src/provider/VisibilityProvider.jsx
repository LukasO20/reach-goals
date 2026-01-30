import { useState, createContext, useCallback, useMemo } from 'react'

const VisibilityContext = createContext()

const VisibilityProvider = ({ children }) => {
    const [visibleElements, setVisibleElement] = useState([])

    const setSafeVisibleElement = (updateFn) => {
        setVisibleElement((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }

    const updateVisibility = useCallback((prev = [], { class: classTarget, operator }) => {
        const classType = Array.isArray(classTarget)

        if (classType) {
            if (operator.add) return [...prev.slice(0, 2), ...classTarget]
            if (operator.remove) {
                const filtered = prev.filter(c => !classTarget.includes(c))
                return filtered.slice(0, -1)
            }

            return classTarget
        }
    }, [])

    const removeVisibility = useCallback((prev = [], { class: classTarget, operator }) => {
        const classType = Array.isArray(classTarget)
        if (classType) {
            if (operator.maintain) return classTarget
            return prev.filter(classPrevious => classTarget.some(el => el !== classPrevious))
        }
    }, [])

    const toggleVisibility = useCallback(({ class: classTarget, operator } = {}, event) => {
        event?.stopPropagation()
        const parameterTarget = {
            class: classTarget ?? null,
            operator: {
                add: operator?.add ?? false,
                remove: operator?.remove ?? false,
                maintain: operator?.maintain ?? false
            }
        }

        setSafeVisibleElement((prev) => {
            const isArrayClass = Array.isArray(parameterTarget.class)
            const isVisible = isArrayClass ? parameterTarget.class.some(c => prev.includes(c)) : false
            return isVisible ? removeVisibility(prev, parameterTarget) : updateVisibility(prev, parameterTarget)
        })

    }, [updateVisibility, removeVisibility])

    const value = useMemo(() => ({ toggleVisibility, visibleElements }), [toggleVisibility, visibleElements])
    //console.log('VISIBLES - ', visibleElements)

    return (
        <VisibilityContext.Provider value={value}>
            {children}
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }