import { useMemo, useEffect } from 'react'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider.jsx'

import { buildFilterModelMap } from '../../../utils/mapping/mapping-utils-provider.js'

import ModalModelList from '.'

/** @typedef {import('./types.js').ModalModelListWrapperProps} Props */

/**
 * @param {Props} props
 */
export const ModalModelListWrapper = ({ title, type, typeFilterKey }) => {
    const { model, setFilterModel } = useManageModel()

    const dataFilter = useMemo(() => {
        const valueFetch = type === 'goal' ? undefined : model.mainModelID
        return buildFilterModelMap(type, typeFilterKey, 'modal', valueFetch)
    }, [model.mainModelID, type, typeFilterKey])

    useEffect(() => {
        setFilterModel({ filter: dataFilter, type })
    }, [dataFilter, setFilterModel, type])

    return (
        <ModelQueryClientProvider>
            <ModalModelList title={title} type={type} />
        </ModelQueryClientProvider>
    )
}
