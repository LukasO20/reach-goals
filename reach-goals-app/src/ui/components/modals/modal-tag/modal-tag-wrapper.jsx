import { useState } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider' 

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider' 

import ModalTag from '.'

export const ModalTagWrapper = () => {
    const [filterTabs, setFilterTabs] = useState(null)
    const dataFilter = filterTabs ?? buildFilterModelMap('tag', 'tagSomeID', 'modal', 'all')
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalTag onFilterTabs={setFilterTabs} />
        </ModelQueryClientProvider>
    )
}