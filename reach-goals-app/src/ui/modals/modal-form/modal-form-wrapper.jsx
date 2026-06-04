import { useEffect, useMemo } from 'react'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider' 

import { buildFilterModelMap } from '../../../utils/mapping/mappingUtilsProvider' 

import ModalForm from '.'

export const ModalFormWrapper = () => {
    const { model, setFilterModel } = useManageModel()

    const dataFilter = useMemo(() => {
        return buildFilterModelMap(model.typeModel, `${model.typeModel}SomeID`, 'modal', model.mainModelID)
    }, [model.typeModel, model.mainModelID])
     
    useEffect(() => {
        setFilterModel(dataFilter, model.typeModel)
    }, [dataFilter, setFilterModel, model.typeModel])

    return (
        <ModelQueryClientProvider>
            <ModalForm />
        </ModelQueryClientProvider>
    )
}