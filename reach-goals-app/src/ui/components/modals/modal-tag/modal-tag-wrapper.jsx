import { useMemo, useState } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import ModalTag from '.'

export const ModalTagWrapper = () => {
    const [filterTabs, setFilterTabs] = useState(null)
    const dataFilter = useMemo(() => {
        return filterTabs ?? buildFilterModelMap('tag', 'tagSomeID', 'modal', 'all')
    }, [filterTabs])

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalTag onFilterTabs={setFilterTabs} />
        </ModelQueryClientProvider>
    )
}