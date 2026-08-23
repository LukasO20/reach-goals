import { useEffect, useMemo } from 'react'
import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'

import { buildFilterModelMap } from '../../../utils/mapping/mappingUtilsProvider'

import ModalForm from '.'

/** @typedef {import('./types.js').ModalFormProps} Props */

/**
 * @param {Props} props
 */
export const ModalFormWrapper = ({ type, modelID, setFilterModel }) => {
    const dataFilter = useMemo(() => {
        return buildFilterModelMap(type, `${type}SomeID`, 'modal', modelID)
    }, [modelID, type])

    useEffect(() => {
        setFilterModel({ filter: dataFilter, type })
    }, [dataFilter, setFilterModel])

    return (
        <ModelQueryClientProvider>
            <ModalForm />
        </ModelQueryClientProvider>
    )
}
