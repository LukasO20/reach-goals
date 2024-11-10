import React, { useContext, useState } from 'react'

const CheckboxContext = React.createContext()

const CheckboxProvider = ({ children }) => {
    const [ valuesCheckbox, setValueCheckbox ] = useState([])

    const toggleValueByID = (checkbox) => {
        setValueCheckbox((prev) => {
            const updateCheckbox = prev.map((item) =>
                item.id === checkbox.id ? { ...item, value: !item.value } : item
            )

            if (!updateCheckbox.some((item) => item.id === checkbox.id)) {
                updateCheckbox.push({ id: checkbox.id, value: true })
            }

            return updateCheckbox
        })
    }

    console.log('VALUES DO CHECKBOX - ', valuesCheckbox)

    return (
        <CheckboxContext.Provider value={{valuesCheckbox, toggleValueByID}}>
            {children}
        </CheckboxContext.Provider>
    )
}

const useBool = () => useContext(CheckboxContext)
export { CheckboxProvider, useBool }