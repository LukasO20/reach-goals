import { useEffect } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useTitle } from '../../../../provider/ui/title-provider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import Home from '.'

export const HomeWrapper = () => {
    const { update } = useTitle()
    const { data: { layout, visibility } } = useSwitchLayout()

    const layoutHome = layout.page.layoutName
    const isPieChartLayout = layoutHome === 'chart'

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [update])

    const dataHomeColumns = buildFilterModelMap(visibility.layoutHome, 
        visibility.layoutHome === 'goal' ? 'goalSomeID' : 'assignmentSomeID', 
        'page', 
        'all')

    const dataHomeChart = {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }
        
    const dataFilter = isPieChartLayout ? dataHomeChart : dataHomeColumns

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Home />
        </ModelQueryClientProvider>
    )
}