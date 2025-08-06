import React, { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from './ManageModelProvider.jsx'

import { useGetModel } from '../hook/useGetModel.js'

import { getModelMap } from '../utils/mapping/mappingUtilsProvider.js'
import { formatDate } from '../utils/utils.js' 

const DataModelContext = React.createContext()

const mergeList = (prevList, incomingList) => {
    if (!Array.isArray(prevList) && !Array.isArray(incomingList)) return console.error('prevList/incomingList should be an array.')
    const newList = incomingList.filter(item =>
        !prevList.some(existing => existing.id === item.id))

    return newList
}

const DataModelProvider = ({ children }) => {
    const [modelGet, setModelGet] = useState(getModelMap)
    const [isCurrentMode, setIsCurrentMode] = useState(false)

    const { model: currentModelGet, setModel } = useContext(ManageModelContext)
    const { params: getParams, data: getData, setParams } = useGetModel({})

    const getModel = (requestPropsGetModel, { current }) => {
        setParams(requestPropsGetModel)
        setIsCurrentMode(current)
    }

    const switchSetModel = ({ data, params, current }) => {
        if (!Array.isArray(data) || data.length === 0) return
        if (!params) return

        if (current === true) {
            setModel(prev => ({
                ...prev,
                submitModel: { ...data[0], ...formatDate(data[0]) }
            }))
        } else {
            setModelGet(prev => ({
                ...prev,
                [params.type]: [...mergeList(prev[params.type], data)]
            }))
        }
    }

    useEffect(() => {
        if (!getData) return
        switchSetModel({ data: getData, params: getParams, current: isCurrentMode })
    }, [getData])

    //console.log('MANAGE DATA READY? ', modelGet, currentModelGet)

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