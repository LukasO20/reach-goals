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
    const [isCurrentMode, setIsCurrentMode] = useState(false)
    const { params: getParams, data: getData, setParams } = useGetModel({})

    const getModel = (requestPropsGetModel, { current }) => {
        setParams(requestPropsGetModel)
        setIsCurrentMode(current)
    }

    const switchSetModel = ({ data, params, current }) => {
        if (!params) return

        const updater = current === true ? setCurrentModelGet : setModelGet
        updater(prev => ({
            ...prev,
            [params.type]: current === true ? {...data[0]} : [...mergeList(prev[params.type], data)]
        }))
    }

    useEffect(() => {
        if (!getData) return
        switchSetModel({ data: getData, params: getParams, current: isCurrentMode })
    }, [getData])

    console.log('MANAGE DATA READY? ', modelGet, currentModelGet)

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