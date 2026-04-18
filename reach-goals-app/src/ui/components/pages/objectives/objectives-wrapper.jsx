import { useState } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import Objectives from '.'

export const ObjectivesWrapper = () => {
    const [filterTabs, setFilterTabs] = useState(null)

    const dataFilter = filterTabs ?? {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Objectives onFilterTabs={setFilterTabs} />
        </ModelQueryClientProvider>
    )
}