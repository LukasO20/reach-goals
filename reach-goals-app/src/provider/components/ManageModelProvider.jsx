import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [selectModelID, setSelectModelID] = useState(null)

    return (
        <ManageModelContext.Provider value={{ selectModelID, setSelectModelID }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }