import { useContext, useState, createContext, useMemo, useCallback } from 'react'

import { checkboxMap } from '../utils/mapping/mappingUtilsProvider'
import { check } from 'prisma'

const CheckboxContext = createContext()

export const CheckboxProvider = ({ children }) => {
    const [valuesCheckbox, setCheckbox] = useState(checkboxMap)

    const toggleCheckbox = useCallback((checkbox) => {
        console.log('I RECEIVE - ', checkbox)
        setCheckbox((prev) => {
            return {
                ...prev,
                [checkbox.scope]: {
                    ...prev[checkbox.scope],
                    checked: !prev.page.checked
                }
            }
            //TODO: receive checkbox object like checkboxMap

            //TODO: only use ...prev to add new objects on selected, don`t erase the previous 

            //TODO: with prev true on page scope. enable all checkboxes selected from checkboxMap.page.selected
            //TODO: with prev false on page scope. disable all checkboxes selected from checkboxMap.page.selected
            
            //TODO: with prev true on modal scope. enable all checkboxes selected from checkboxMap.modal.selected
            //TODO: with prev false on modal scope. disable all checkboxes selected from checkboxMap.modal.selected
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

    return (
        <CheckboxContext.Provider value={value}>
            {children}
        </CheckboxContext.Provider>
    )
}

export const useCheckbox = () => useContext(CheckboxContext)