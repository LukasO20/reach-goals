import React, { useState } from 'react'

const ManageModelContext = React.createContext()
const resetObject = {
    typeModel: '',
    mainModelID: null,
    transportModel: [],
    submitModel: {}
}

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState(resetObject)

    const addToTransportModel = (newModel) => {
        if (typeof newModel !== 'object') { return console.error('No model provided to add to transport model. The model should be an object') }
        if (!newModel.id || !newModel.name) { return console.error('The model object must have an id and a name property') }

        setModel(prevModel => {
            const alreadyExists = prevModel.transportModel.some(item => item.id === newModel.id)
            return alreadyExists ? prevModel : {
                ...prevModel,
                transportModel: [
                    ...prevModel.transportModel,
                    { id: newModel.id, name: newModel.name, type: newModel.type }]
            }
        })
    }

    const removeFromTransportModel = (modelID) => {
        setModel(prevModel => {
            const updatedTransportModel = prevModel.transportModel.filter(item => (item.id ?? item.tagID) !== modelID)
            return {
                ...prevModel,
                transportModel: updatedTransportModel
            }
        })
    }

    const updateSubmitModel = ({ keyObject, value, type = 'single', action = 'add' }) => {
        if (!keyObject) return console.error('To update a submitModel is necessary a key')

        const submitToAdd = (prevValue) => {
            return type === 'array'
                ? [...(Array.isArray(prevValue) ? prevValue : []), value] : value
        }

        const submitToRemove = (prevValue) => {
            if (type === 'array') {
                const currentList = Array.isArray(prevValue) ? prevValue : []
                return currentList.filter(item => {
                    if (typeof item === 'object' && item !== null && typeof value === 'object') {
                        switch (keyObject) {
                            case 'tags':
                                return item.tagID !== value.tagID
                            default:
                                return item.id !== value.id
                        }
                    }
                    return item !== value
                })

            } else { return value }
        }

        setModel(prev => {
            const prevValue = prev.submitModel[keyObject]
            const newValue = action === 'add' ? submitToAdd(prevValue) :
                action === 'remove' ? submitToRemove(prevValue) : null

            return {
                ...prev,
                submitModel: {
                    ...prev.submitModel,
                    [keyObject]: newValue
                }
            }
        })
    }

    const resetManageModel = () => {
        setModel(resetObject)
    }

    console.log('MODEL READY TO MANAGE - ', model)

    return (
        <ManageModelContext.Provider value={{
            model,
            setModel,
            addToTransportModel,
            removeFromTransportModel,
            updateSubmitModel,
            resetManageModel
        }}>
            {children}
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }