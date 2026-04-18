import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import Calendar from '.'

export const CalendarWrapper = () => {
    const dataFilter = {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Calendar />
        </ModelQueryClientProvider>
    )
}