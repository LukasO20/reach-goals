import { useContext, useState, createContext, useMemo, useCallback } from 'react'

import { checkboxMap } from '../../utils/mapping/mappingUtilsProvider'

const CheckboxContext = createContext()

export const CheckboxProvider = ({ children }) => {
    const [valuesCheckbox, setCheckbox] = useState(checkboxMap)

    const setSafeCheckbox = (updateFn) => {
        setCheckbox((prev) => {
            const safeValue = updateFn(prev)
            return safeValue ?? prev
        })
    }

    const registerCheckbox = useCallback((checkboxID) => {
        setCheckbox(prev => {
            const registry = new Set(prev.checkboxRegistry)
            registry.add(checkboxID)

            return {
                ...prev,
                checkboxRegistry: registry
            }
        })
    }, [])

    const unregisterCheckbox = useCallback((checkboxID) => {
        setCheckbox(prev => {
            const registry = new Set(prev.checkboxRegistry)
            registry.delete(checkboxID)

            return {
                ...prev,
                checkboxRegistry: registry
            }
        })
    }, [])

    const updateCheckbox = useCallback((prev = checkboxMap, checkbox = checkboxMap) => {
        const checkboxIDMain = checkbox.checkboxIDMain
        const checkboxID = checkbox.checkboxID
        const previousCheckboxSelected = prev[checkbox.scope].selected
        const previousCheckboxRegistry = prev.checkboxRegistry

        const nextCheckbox = new Set(previousCheckboxSelected)
        nextCheckbox.add(checkbox.checkboxID)

        return ({
            ...prev,
            scope: checkbox.scope,
            [checkbox.scope]: {
                selected: checkboxIDMain ? Array.from(previousCheckboxRegistry) : checkboxID ? Array.from(nextCheckbox) : []
            },
            checkboxID: checkbox.checkboxID,
            checkboxIDMain: checkbox.checkboxIDMain
        })
    }, [])

    const removeCheckbox = useCallback((prev = checkboxMap, checkbox = checkboxMap) => {
        const isValidCheckboxIDMain = !!checkbox.checkboxIDMain
        const previousCheckboxSelected = prev[checkbox.scope].selected

        return ({
            ...prev,
            scope: checkbox.scope,
            [checkbox.scope]: {
                selected: isValidCheckboxIDMain ? []: previousCheckboxSelected.filter((c) => c !== (checkbox.checkboxID))
            },
            checkboxIDMain: isValidCheckboxIDMain ? null : checkbox.checkboxIDMain,
            checkboxID: checkbox.checkboxID
        })
    }, [])

    const toggleCheckbox = useCallback((checkbox = checkboxMap) => {
        setSafeCheckbox((prev) => {
            const hasCheckboxID = !!prev[checkbox.scope]?.selected?.includes(checkbox.checkboxID || checkbox.checkboxIDMain)

            return hasCheckboxID ?
                removeCheckbox(prev, checkbox) : updateCheckbox(prev, checkbox)
        })
    }, [])

    const resetCheckbox = useCallback(({ keys } = {}) => {
        if (Array.isArray(keys)) {
            setCheckbox(prevCheckbox => {
                const updated = { ...prevCheckbox }
                keys.forEach(key => {
                    updated[key] = checkboxMap[key]
                })
                return updated
            })
        } else {
            setCheckbox(checkboxMap)
        }
    }, [])

    const value = useMemo(() => ({ valuesCheckbox, toggleCheckbox, registerCheckbox, unregisterCheckbox, resetCheckbox }),
        [valuesCheckbox, toggleCheckbox, registerCheckbox, unregisterCheckbox, resetCheckbox])

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    )
}

export const useCheckbox = () => useContext(CheckboxContext)