import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const ManageModel = () => {
    const [selectModelID, setSelectModelID] = useState(null)
    
    return (
        <ManageModelContext.Provider value={{ selectModelID, setSelectModelID }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModel }