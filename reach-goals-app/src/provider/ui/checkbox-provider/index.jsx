import { useContext, useState, createContext, useMemo, useCallback } from 'react'

import { checkboxMap } from '../../../utils/mapping/mappingUtilsProvider'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').CheckboxContextValue} CheckboxContextValue */

/** @type {React.Context<CheckboxContextValue>} */
const CheckboxContext = createContext()

export const CheckboxProvider = ({ children }) => {
    /** @type {import('./types.js').SetCheckboxStateProps} */
    const [valuesCheckbox, setCheckbox] = useState(checkboxMap)

    /** @type {import('./types.js').SetSafeCheckboxProps} */
    const setSafeCheckbox = (updateFn) => {
        setCheckbox((prev) => {
            const safeValue = updateFn(prev)
            return safeValue ?? prev
        })
    }

    /** @type {import('./types.js').RegisterCheckboxProps}  */
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

    /** @type {import('./types.js').UnregisterCheckboxProps}  */
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

    /** @type {import('./types.js').UpdateCheckboxProps}  */
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

    /** @type {import('./types.js').RemoveCheckboxProps}  */
    const removeCheckbox = useCallback((prev = checkboxMap, checkbox = checkboxMap) => {
        const isValidCheckboxIDMain = !!checkbox.checkboxIDMain
        const previousCheckboxSelected = prev[checkbox.scope].selected

        return ({
            ...prev,
            scope: checkbox.scope,
            [checkbox.scope]: {
                selected: isValidCheckboxIDMain ? [] : previousCheckboxSelected.filter((c) => c !== (checkbox.checkboxID))
            },
            checkboxIDMain: isValidCheckboxIDMain ? null : checkbox.checkboxIDMain,
            checkboxID: checkbox.checkboxID
        })
    }, [])

    /** @type {import('./types.js').ToggleCheckboxProps}  */
    const toggleCheckbox = useCallback((checkbox = checkboxMap) => {
        setSafeCheckbox((prev) => {
            const hasCheckboxID = !!prev[checkbox.scope]?.selected?.includes(checkbox.checkboxID || checkbox.checkboxIDMain)

            return hasCheckboxID ?
                removeCheckbox(prev, checkbox) : updateCheckbox(prev, checkbox)
        })
    }, [removeCheckbox, updateCheckbox])

    /** @type {import('./types.js').ResetCheckboxProps}  */
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

    //console.log('CheckboxProvider - valuesCheckbox:', valuesCheckbox)

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    )
}

export const useCheckbox = () => useContext(CheckboxContext)