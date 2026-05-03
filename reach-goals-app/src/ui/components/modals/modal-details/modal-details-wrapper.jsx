import { useMemo } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider.jsx'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import ModalDetails from '.'

/** @typedef {import('./types.js').ModalDetailsProps} Props */

/**
 * @param {Props} props
 */
export const ModalDetailsWrapper = ({ modelID, type }) => {
    const dataFilter = useMemo(() => {
        return buildFilterModelMap(type, `${type}SomeID`, 'modal', modelID)
    }, [modelID, type])

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalDetails />
        </ModelQueryClientProvider>
    )
}