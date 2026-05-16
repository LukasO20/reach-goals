import { useState, createContext, useCallback, useMemo, useContext } from 'react'

/** @import * as React from 'react' */
/** @typedef {import('./types.js').VisibilityContextValue} VisibilityContextValue */

/** @type {React.Context<VisibilityContextValue>} */
const VisibilityContext = createContext()

export const VisibilityProvider = ({ children }) => {
    /** @type {import('./types.js').SetVisibleElementStateProps} */
    const [visibleElements, setVisibleElement] = useState([])

    /** @type {import('./types.js').SetSafeVisibleElementProps} */
    const setSafeVisibleElement = (updateFn) => {
        setVisibleElement((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }
    /** @type {import('./types.js').UpdateVisibilityProps} */
    const updateVisibility = useCallback((prev = [], { class: classTarget, operator }) => {
        if (Array.isArray(classTarget)) {
            if (operator.add) return [...prev.slice(0, 2), ...classTarget]
            if (operator.remove) {
                const filtered = prev.filter(c => !classTarget.includes(c))
                return filtered.slice(0, -1)
            }

            return classTarget
        }

        return prev
    }, [])

    /** @type {import('./types.js').RemoveVisibilityProps} */
    const removeVisibility = useCallback((prev = [], { class: classTarget, operator }) => {
        if (Array.isArray(classTarget)) {
            if (operator.maintain) return classTarget
            return prev.filter(c => !classTarget.includes(c))
        }

        return prev
    }, [])

    /** @type {import('./types.js').ToggleVisibilityProps} */
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

    //console.log('VisibilityProvider - visibleElements:', visibleElements)

    return (
        <VisibilityContext.Provider value={value}>
            {children}
        </VisibilityContext.Provider>
    )
}

export const useVisibility = () => useContext(VisibilityContext)