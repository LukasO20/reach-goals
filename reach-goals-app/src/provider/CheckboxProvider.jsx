import { useContext, useState, createContext, useMemo, useCallback } from 'react'

import { checkboxMap } from '../utils/mapping/mappingUtilsProvider'

const CheckboxContext = createContext()

export const CheckboxProvider = ({ children }) => {
    const [valuesCheckbox, setCheckbox] = useState(checkboxMap)


    const setSafeCheckbox = (updateFn) => {
        setCheckbox((prev) => {
            const safeValue = updateFn(prev) ?? checkboxMap
            return safeValue
        })
    }

    const updateCheckbox = useCallback((prev = checkboxMap, checkbox) => (
        {
            ...prev,
            checkboxID: checkbox.checkboxID,
            [checkbox.scope]: {
                selected: [...prev[checkbox.scope].selected, checkbox.checkboxID]
            },
            scope: checkbox.scope
        }
    ), [])

    const removeCheckbox = useCallback((prev = checkboxMap, checkbox) => (
        {
            ...prev,
            checkboxID: checkbox.checkboxID,
            [checkbox.scope]: {
                selected: prev[checkbox.scope].selected.filter((c) => c !== checkbox.checkboxID)
            },
            scope: checkbox.scope
        }
    ), [])

    const toggleCheckbox = useCallback((checkbox) => {
        setSafeCheckbox((prev) => {
            const hasCheckboxID = !!prev[checkbox.scope]?.selected?.includes(checkbox.checkboxID)

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

    const value = useMemo(() => ({ valuesCheckbox, toggleCheckbox, resetCheckbox }), [valuesCheckbox, toggleCheckbox, resetCheckbox])
    console.log('VALUESCHECK ', valuesCheckbox)

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    )
}

export const useCheckbox = () => useContext(CheckboxContext)