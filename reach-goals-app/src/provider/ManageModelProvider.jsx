import React, { useState, useCallback, useMemo } from 'react'

import { manageModelMap } from '../utils/mapping/mappingUtilsProvider.js'

const ManageModelContext = React.createContext()

const ManageModelProvider = ({ children }) => {
    const [model, setModel] = useState(manageModelMap)

    const addToTransportModel = useCallback(({ id, name, type, color, custom }) => {
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
                            { [dynamicKey]: id, name: name, type: type, ...custom }
                    ]
                }
            }
        })
    }, [])

    const removeFromTransportModel = useCallback(({ id, type }) => {
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
    }, [])

    const updateFormModel = useCallback(({ keyObject, value, type = 'single', action = 'add' }) => {
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
    }, [])

    const updateFilterModel = useCallback(({ filter = {}, model, scope }) => {
        if (!model) return console.error('To update a filterModel is necessary a model.')
        if (scope !== 'page' && scope !== 'modal') return console.error('To update a filterModel is necessary a scope value. Send "page" or "modal" scope.')

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
    }, [])

    const updateDataModel = useCallback(({ data, type, scope }) => {
        if (typeof type !== 'string' || type === '') return console.error('To update a dataModel is necessary a type')
        if (typeof scope !== 'string' || scope === '') return console.error('To update a dataModel is necessary a typesource')

        setModel(prevModel => ({
            ...prevModel,
            dataModel: {
                ...prevModel.dataModel,
                [type]: {
                    ...prevModel.dataModel[type],
                    [scope]: {
                        ...prevModel.dataModel[type][scope], data,
                    },
                },
            },
        }))
    }, [])

    const resetManageModel = useCallback(({ keys } = {}) => {
        if (Array.isArray(keys)) {
            setModel(prevModel => {
                const updated = { ...prevModel }
                keys.forEach(key => {
                    updated[key] = manageModelMap[key]
                })
                return updated
            })
        } else {
            setModel(prevModel => ({
                ...manageModelMap,
                dataModel: prevModel.dataModel,
                filter: prevModel.filter,
                formModel: prevModel.formModel
            }))
        }
    }, [])

    const value = useMemo(() => ({
        model,
        setModel,
        addToTransportModel,
        removeFromTransportModel,
        updateFormModel,
        updateFilterModel,
        updateDataModel,
        resetManageModel
    }), [
        model, addToTransportModel, removeFromTransportModel,
        updateFormModel, updateFilterModel, updateDataModel, resetManageModel
    ])

    //console.log('MODEL READY TO MANAGE - ', model)

    return (
        <ManageModelContext.Provider value={value}>
            {children}
        </ManageModelContext.Provider>
    )
}

export { ManageModelContext, ManageModelProvider }