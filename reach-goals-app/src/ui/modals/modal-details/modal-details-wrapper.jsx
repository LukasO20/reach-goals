import { useMemo, useEffect } from 'react'
import { useManageModel } from '../../../provider/model/manage-model-provider/index.jsx'
import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider.jsx'

import { buildFilterModelMap } from '../../../utils/mapping/mappingUtilsProvider'

import ModalDetails from '.'

/** @typedef {import('./types.js').ModalDetailsProps} Props */

/**
 * @param {Props} props
 */
export const ModalDetailsWrapper = ({ modelID, type }) => {
    const { setFilterModel } = useManageModel()
    const dataFilter = useMemo(() => {
        return buildFilterModelMap(type, `${type}SomeID`, 'modal', modelID)
    }, [modelID, type])

    useEffect(() => {
        setFilterModel(dataFilter, type)
    }, [dataFilter, setFilterModel, type])

    return (
        <ModelQueryClientProvider>
            <ModalDetails />
        </ModelQueryClientProvider>
    )
}