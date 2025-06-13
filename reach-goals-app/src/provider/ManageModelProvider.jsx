import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [manageModel, setManageModel] = useState({
        mainModelID: null,
        relatedModelID: null
    })
    console.log('MODEL SELECTED - ', manageModel)

    return (
        <ManageModelContext.Provider value={{ manageModel, setManageModel }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }