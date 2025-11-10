import React, { useState } from 'react'

import { manageModelMap } from '../utils/mapping/mappingUtilsProvider.js'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState(manageModelMap)

    const addToTransportModel = ({ id, name, type, color }) => {
        if (!id || !name) return console.error('The model object must have an id and a name property')
        if (typeof type !== 'string') return console.error('The type is necessary and should be a string value. Did you send something like "tag" or "assignment"?')

        const dynamicKey = type === 'tag' ? 'tagID' : 'id'
        const tagAdded = type === 'tag'

        setModel(prevModel => {
            const alreadyExists = prevModel.transportModel[type].some(item => (item.id ?? item.tagID) === id)
            return alreadyExists ? prevModel : {
                ...prevModel,
                transportModel: {
                    ...prevModel.transportModel,
                    [type]: [
                        ...prevModel.transportModel[type],
                        tagAdded ?
                            { [dynamicKey]: id, name: name, type: type, color: color }
                            :
                            { [dynamicKey]: id, name: name, type: type }
                    ]
                }
            }
        })
    }

    const removeFromTransportModel = ({ id, type }) => {
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

    const updateFormModel = ({ keyObject, value, type = 'single', action = 'add' }) => {
        if (!keyObject) return console.error('To update a formModel is necessary a key')

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
            const prevValue = prevModel.formModel[keyObject]
            const notExists = Array.isArray(prevValue) ? !prevValue.some(item => (item.id ?? item.tagID) === (value.id ?? value.tagID)) : true
            const newValue = action === 'add' && notExists ? submitToAdd(prevValue) :
                action === 'remove' ? submitToRemove(prevValue) : prevValue

            return {
                ...prevModel,
                formModel: {
                    ...prevModel.formModel,
                    [keyObject]: newValue
                }
            }
        })
    }

    const updateFilterModel = (filter = {}, model, scope) => {
        if (!model) return console.error('To update a filterModel is necessary a model.')
        if (scope !== 'page' && scope !== 'panel') return console.error('To update a filterModel is necessary a scope value. Send "page" or "panel" scope.')

        setModel(prevModel => ({
            ...prevModel,
            filter: {
                ...prevModel.filter,
                [model]: {
                    ...prevModel.filter[model],
                    scope,
                    [scope]: { ...filter }
                },
            }
        }))
    }

    const updateDataModel = (data, type, typesource) => {
        if (typeof type !== 'string' || type === "") return console.error('To update a dataModel is necessary a type')
        if (typeof typesource !== 'string' || typesource === "") return console.error('To update a dataModel is necessary a typesource')

        setModel(prevModel => ({
            ...prevModel,
            dataModel: {
                ...prevModel.dataModel,
                [type]: {
                    ...prevModel.dataModel[type],
                    [typesource]: {
                        ...prevModel.dataModel[type][typesource], data,
                    },
                },
            },
        }))
    }

    const resetManageModel = () => {
        setModel(prevModel => ({
            ...manageModelMap,
            dataModel: prevModel.dataModel,
            filter: prevModel.filter,
            formModel: prevModel.formModel
        }))
    }

    console.log('MODEL READY TO MANAGE - ', model)

    return (
        <ManageModelContext.Provider value={{
            model,
            setModel,
            addToTransportModel,
            removeFromTransportModel,
            updateFormModel,
            updateFilterModel,
            updateDataModel,
            resetManageModel
        }}>
            {children}
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }