import React, { useState, useEffect } from 'react'

import { useGetModel } from '../hook/useGetModel.js'

import { getModelMap } from '../utils/mappingUtilsProvider.js'

const DataModelContext = React.createContext()

const DataModelProvider = ({children}) => {
    const [dataModelGet, setDataModelGet] = useState(getModelMap)
    const [requestProps, setRequestProps] = useState({})
    const { data: getData } = useGetModel({ requestProps: requestProps })

    const getModel = (requestPropsGetModel) => {
        setRequestProps(requestPropsGetModel)
    }

    useEffect(() => {
        if (!requestProps.type || !getData) return
        setDataModelGet(prev => ({ ...prev, [requestProps.type]: getData }))
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