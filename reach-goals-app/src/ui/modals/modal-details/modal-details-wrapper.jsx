import { useMemo, useEffect } from 'react'
import { useManageModel } from '../../../provider/model/manage-model-provider/index.jsx'
import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider.jsx'

import { buildFilterModelMap } from '../../../utils/mapping/mapping-utils-provider.js'

import ModalDetails from '.'

/** @typedef {import('./types.js').ModalDetailsProps} Props */

/**
 * @param {Props} props
 */
export const ModalDetailsWrapper = ({ modelID, type, setFilterModel }) => {
    const dataFilter = useMemo(() => {
        return buildFilterModelMap(type, `${type}SomeID`, 'modal', modelID)
    }, [modelID, type])

    useEffect(() => {
        setFilterModel({ filter: dataFilter, type })
    }, [dataFilter, setFilterModel])

    return (
        <ModelQueryClientProvider>
            <ModalDetails />
        </ModelQueryClientProvider>
    )
}
