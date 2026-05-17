import { useState, useCallback, useMemo, useContext, createContext } from 'react'

import { manageModelMap } from '../../../utils/mapping/mappingUtilsProvider'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').ManageModelContextValue} ManageModelContextValue */

/** @type {React.Context<ManageModelContextValue>} */
const ManageModelContext = createContext()

export const ManageModelProvider = ({ children }) => {
    /** @type {import('./types.js').SetModelStateProps} */
    const [model, setModel] = useState(manageModelMap)

    /** @type {import('./types.js').AddToSelectedModelProps} */
    const addToSelectedModel = useCallback(({ id, name, type, color, custom }) => {
        if (!id || !name) return console.error('The model object must have an id and a name property')
        if (typeof type !== 'string') return console.error('The type is necessary and should be a string value. Did you send something like "tag" or "assignment"?')

        const dynamicKey = type === 'tag' ? 'tagID' : 'id'
        const tagAdded = type === 'tag'

        setModel(prevModel => {
            const alreadyExists = prevModel.selectedModel[type].some(item => (item.id ?? item.tagID) === id)
            return alreadyExists ? prevModel : {
                ...prevModel,
                selectedModel: {
                    ...prevModel.selectedModel,
                    [type]: [
                        ...prevModel.selectedModel[type],
                        tagAdded ?
                            { [dynamicKey]: id, name: name, type: type, color: color }
                            :
                            { [dynamicKey]: id, name: name, type: type, ...custom }
                    ]
                }
            }
        })
    }, [])

    /** @type {import('./types.js').RemoveFromSelectedModelProps} */
    const removeFromSelectedModel = useCallback(({ id, type }) => {
        setModel(prevModel => {
            const updatedSelectedModel = prevModel.selectedModel[type].filter(item => (item.id ?? item.tagID) !== id)
            return {
                ...prevModel,
                selectedModel: {
                    ...prevModel.selectedModel,
                    [type]: updatedSelectedModel
                }
            }
        })
    }, [])

    /** @type {import('./types.js').UpdateActiveModelProps} */
    const updateActiveModel = useCallback(({ keyObject, value, type = 'single', action = 'add' }) => {
        if (!keyObject) return console.error('To update a activeModel is necessary a key')

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
            const prevValue = prevModel.activeModel[keyObject]
            const notExists = Array.isArray(prevValue) ? !prevValue.some(item => (item.id ?? item.tagID) === (value.id ?? value.tagID)) : true
            const newValue = action === 'add' && notExists ? submitToAdd(prevValue) :
                action === 'remove' ? submitToRemove(prevValue) : prevValue

            return {
                ...prevModel,
                activeModel: {
                    ...prevModel.activeModel,
                    [keyObject]: newValue
                }
            }
        })
    }, [])

    /** @type {import('./types.js').SetFilterModelProps} */
    const setFilterModel = useCallback((filter, type) => {
        if (!filter || !type) return
        if (type) {
            setModel((prevModel) => {
                const incomingData = filter[type]
                const currentData = prevModel.filter?.[type] || {}

                return {
                    ...prevModel,
                    filter: {
                        ...prevModel.filter,
                        [type]: {
                            ...currentData,
                            ...incomingData
                        }
                    }
                }
            })
        }
    }, [])

    /** @type {import('./types.js').UpdateDataModelProps} */
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

    /** @type {import('./types.js').ResetManageModelProps} */
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
                activeModel: prevModel.activeModel
            }))
        }
    }, [])

    const value = useMemo(() => ({
        model,
        setModel,
        addToSelectedModel,
        removeFromSelectedModel,
        updateActiveModel,
        setFilterModel,
        updateDataModel,
        resetManageModel
    }), [
        model, addToSelectedModel, removeFromSelectedModel,
        updateActiveModel, setFilterModel, updateDataModel, resetManageModel
    ])

    console.log('ManageModelProvider - model:', model)

    return (
        <ManageModelContext.Provider value={value}>
            {children}
        </ManageModelContext.Provider>
    )
}

export const useManageModel = () => useContext(ManageModelContext)