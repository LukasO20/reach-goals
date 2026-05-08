import { useMemo } from 'react'
import { useManageModel } from '../../../../provider/model/manage-model-provider'

import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider' 

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider' 

import ModalForm from '.'

export const ModalFormWrapper = () => {
    const { model } = useManageModel()

    const dataFilter = useMemo(() => {
        return buildFilterModelMap(model.typeModel, `${model.typeModel}SomeID`, 'modal', model.mainModelID)
    }, [model.typeModel, model.mainModelID])
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalForm />
        </ModelQueryClientProvider>
    )
}