import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider' 

import { useManageModel } from '../../../../provider/model/ManageModelProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider' 

import ModalForm from '.'

export const ModalFormWrapper = () => {
    const { model } = useManageModel();
    const dataFilter = buildFilterModelMap(model.typeModel, `${model.typeModel}SomeID`, 'modal', model.mainModelID)
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalForm />
        </ModelQueryClientProvider>
    )
}