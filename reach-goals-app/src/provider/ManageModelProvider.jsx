import React, { useState } from 'react'

const ManageModelContext = React.createContext()
const resetObject = {
    typeModel: '',
    mainModelID: null,
    transportModel: {
        tag: [],
        assignment: [],
        goal: []
    },
    submitModel: {}
}

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState(resetObject)

    const addToTransportModel = ({ id, name, type }) => {
        if (!id || !name) return console.error('The model object must have an id and a name property')
        if (typeof type !== 'string') return console.error('The type is necessary and should be a string value. Did you send something like "tag" or "assignment"?')

        const dynamicKey = type === 'tag' ? 'tagID' : 'id'

        setModel(prevModel => {
            const alreadyExists = prevModel.transportModel[type].some(item => (item.id ?? item.tagID) === id)
            return alreadyExists ? prevModel : {
                ...prevModel,
                transportModel: {
                    ...prevModel.transportModel,
                    [type]: [
                        ...prevModel.transportModel[type],
                        { [dynamicKey]: id, name: name, type: type }
                    ]
                }
            }
        })
    }

    const removeFromTransportModel = ({ id, type }) => {
        console.log("READY TO REMOVE - ", id, type)
        setModel(prevModel => {
            const updatedTransportModel = prevModel.transportModel[type].filter(item => (item.id ?? item.tagID) !== id)
            return {
                ...prevModel,
                transportModel: {
                    ...prevModel.transportModel,
                    [type]: updatedTransportModel
                }
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
                        if (keyObject === 'tags') {
                            return item.tagID !== value.tagID
                        }
                        return item.id !== value.id
                    }
                    return item !== value
                })
            } else { return value }
        }

        setModel(prevModel => {
            const prevValue = prevModel.submitModel[keyObject]
            const notExists = Array.isArray(prevValue) ? !prevValue.some(item => (item.id ?? item.tagID) === (value.id ?? value.tagID)) : true
            const newValue = action === 'add' && notExists ? submitToAdd(prevValue) :
                action === 'remove' ? submitToRemove(prevValue) : prevValue

            return {
                ...prevModel,
                submitModel: {
                    ...prevModel.submitModel,
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