import { useState, createContext,useCallback, useMemo } from 'react'

const VisibilityContext = createContext()

const VisibilityProvider = ({ children }) => {
    const [visibleElements, setVisibleElement] = useState([])

    const setSafeVisibleElement = (updateFn) => {
        setVisibleElement((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }

    const updateVisibility = useCallback(({ class: classTarget, operator }) => {
        setSafeVisibleElement((prev) => {
            const classType = Array.isArray(classTarget)

            if (classType) {
                let filter = [...prev]

                if (operator.add) {
                    filter = filter.slice(0, 2)
                    filter.push(...classTarget)
                    return filter
                }

                if (operator.remove) {
                    if (classTarget) {
                        filter = filter.filter(classPrevious => classTarget.some(el => el !== classPrevious))
                    }

                    filter.pop()
                    return filter
                }

                return classTarget
            }
        })
    }, [])

    const removeVisibility = useCallback(({ class: classTarget, operator }) => {
        setSafeVisibleElement((prev) => {
            const classType = Array.isArray(classTarget)
            if (classType) {
                if (operator.maintain) {
                    return classTarget
                }

                return prev.filter(classPrevious => classTarget.some(el => el !== classPrevious))
            }
        })
    }, [])

    const toggleVisibility = useCallback(({ class: classTarget, operator }, event) => {
        event?.stopPropagation()
        const parameterTarget = {
            class: classTarget ?? null,
            operator: {
                add: operator?.add ?? false,
                remove: operator?.remove ?? false,
                maintain: operator?.maintain ?? false
            }
        }
        const isVisible = visibleElements.some(classes => {
            const isArrayClass = Array.isArray(parameterTarget.class)

            return isArrayClass ? parameterTarget.class.includes(classes) : false
        })
        isVisible ? removeVisibility(parameterTarget) : updateVisibility(parameterTarget)
    }, [visibleElements, updateVisibility, removeVisibility])

    const value = useMemo(() => ({ toggleVisibility, visibleElements }), [toggleVisibility, visibleElements])
    //console.log('VISIBLES - ', visibleElements)

    return (
        <VisibilityContext.Provider value={value}>
            {children}
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }