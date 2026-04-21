import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider.jsx' 

import { useManageModel } from '../../../../provider/model/manage-model-provider.jsx'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ModalModelList from '.' 

/** @typedef {import('./types.js').ModalModelListWrapperProps} Props */

/**
 * @param {Props} props
 */
export const ModalModelListWrapper = ({ title, type, typeFilterKey }) => {
    const { model } = useManageModel()
    const dataFilter = buildFilterModelMap(type, typeFilterKey, 'modal', model.mainModelID ?? 'all')
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalModelList title={title} type={type} />
        </ModelQueryClientProvider>
    )
}