import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider' 

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider' 

import ModalDetails from '.'

/** @typedef {import('./types.js').ModalDetailsProps} Props */

/**
 * @param {Props} props
 */
export const ModalDetailsWrapper = ({ modelID, type }) => {
    const dataFilter = buildFilterModelMap(type, `${type}SomeID`, 'modal', modelID)
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalDetails />
        </ModelQueryClientProvider>
    )
}