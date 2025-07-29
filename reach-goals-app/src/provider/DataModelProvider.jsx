import React, { useState, useEffect } from 'react'

import { useGetModel } from '../hook/useGetModel.js'
import { useDeleteModel } from '../hook/useDeleteModel.js'

import { getModelMap, currentModelMap } from '../utils/mappingUtilsProvider.js'

const DataModelContext = React.createContext()

const mergeList = (prevList, incomingList) => {
    if (!Array.isArray(prevList) && !Array.isArray(incomingList)) return console.error('prevList/incomingList should be an array.') 
    const newList = incomingList.filter(item =>
        !prevList.some(existing => existing.id === item.id))

    return newList
}

const DataModelProvider = ({ children }) => {
    const [modelGet, setModelGet] = useState(getModelMap)
    const [currentModelGet, setCurrentModelGet] = useState(currentModelMap)
    const [requestPropsState, setRequestPropsState] = useState({})
    const { params: getParams, data: getData, setParams } = useGetModel({})

    const getModel = (requestPropsGetModel) => {
        setRequestPropsState(requestPropsGetModel)
        setParams(requestPropsGetModel)
    }

    useEffect(() => {
        if (!getData) return

        console.log('PROPS STATE? - ', requestPropsState)
        setModelGet(prev => ({
            ...prev,
            [getParams.type]: [...mergeList(prev[getParams.type], getData)]
        }))

    }, [getData])

    console.log('MANAGE DATA READY? ', modelGet)

    return (
        <DataModelContext.Provider
            value={{
                modelGet,
                currentModelGet,
                getModel
            }}
        >
            {children}
        </DataModelContext.Provider>
    )
}

export { DataModelContext, DataModelProvider }