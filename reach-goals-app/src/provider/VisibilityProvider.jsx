import { useState, useContext, createContext } from 'react'

import { ManageModelContext } from './ManageModelProvider'

const VisibilityContext = createContext()

const VisibilityProvider = ({ children }) => {
    const [visibleElements, setVisibleElement] = useState([])
    const { model, resetManageModel } = useContext(ManageModelContext)

    const hasPanelContext = (types = []) => //Used with ManageModelContext
        types.some(type => visibleElements.includes('panel-center') && visibleElements.includes(type))

    const setSafeVisibleElement = (updateFn) => {
        setVisibleElement((prev) => {
            const safeValue = updateFn(prev) ?? []
            return Array.isArray(safeValue) ? safeValue : []
        })
    }

    const updateVisibility = (target) => {
        setSafeVisibleElement((prev) => {
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
        setSafeVisibleElement((prev) => {
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

        if (model?.mainModelID && !hasPanelContext(['assignment', 'goal'])) {
            return console.log('READY TO CLEAN')//resetManageModel()
        }
    }

    console.log('VISIBLES - ', visibleElements)

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children}
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }