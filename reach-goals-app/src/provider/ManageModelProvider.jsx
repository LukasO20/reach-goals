import React, { useState } from 'react'

const ManageModelContext = React.createContext()

const addToTransportModel = (newModel) => {

}

const removeFromTransportModel = (modelID) => {

}

const updateSubmitModel = () => {

}

const resetManageModel = () => {
    return {
        typeModel: '',
        mainModelID: null,
        relatedModelID: null,
        transportModel: [],
        submitModel: {}
    }
}

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState(resetManageModel)

    console.log('MODEL READY TO MANAGE - ', model)

    return (
        <ManageModelContext.Provider value={{ model, setModel }}>
            {children} 
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }