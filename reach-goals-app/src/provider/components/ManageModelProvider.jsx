import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [selectModel, setSelectModel] = useState(null)

    return (
        <ManageModelContext.Provider value={{ selectModel, setSelectModel }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }