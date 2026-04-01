import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import Objectives from './Objectives'

export const ObjectivesWrapper = () => {
    const dataFilter = {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Objectives />
        </ModelQueryClientProvider>
    )
}