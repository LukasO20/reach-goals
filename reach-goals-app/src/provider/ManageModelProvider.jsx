import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState({
        typeModel: '',
        mainModelID: null,
        relatedModelID: null,
        transportModel: [],
        submitModel: {}
    })
    console.log('MODEL SELECTED - ', model)

    return (
        <ManageModelContext.Provider value={{ model, setModel }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }