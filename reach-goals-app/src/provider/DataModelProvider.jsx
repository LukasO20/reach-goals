import React, { useState, useEffect } from 'react'

import { useGetModel } from '../hook/useGetModel.js'
import { useDeleteModel } from '../hook/useDeleteModel.js'

import { getModelMap } from '../utils/mappingUtilsProvider.js'

const DataModelContext = React.createContext()

const DataModelProvider = ({ children }) => {
    const [dataModelGet, setDataModelGet] = useState(getModelMap)
    const { params: getParams, data: getData, setParams } = useGetModel({})

    const getModel = (requestPropsGetModel) => {
        setParams(requestPropsGetModel)
    }

    useEffect(() => {
        if (!getData) return
        setDataModelGet(prev => ({...prev, [getParams.type]: getData}))
    }, [getData])

    console.log('MANAGE DATA READY? ', dataModelGet)

    return (
        <DataModelContext.Provider value={{
            dataModelGet,
            getModel
        }}>
            {children}
        </DataModelContext.Provider>
    )
}

export { DataModelContext, DataModelProvider }