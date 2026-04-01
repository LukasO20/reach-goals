import { useEffect } from 'react'

import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider'
import { useTitle } from '../../../../provider/ui/TitleProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import Home from './Home'

export const HomeWrapper = () => {
    const { update } = useTitle()
    const { layout } = useSwitchLayout()

    const layoutHome = layout.page.layoutName
    const isPieChartLayout = layoutHome === 'pie-chart'

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [update])

    const dataOneType = buildFilterModelMap(layoutHome, 
        layoutHome === 'goal' ? 'goalSomeID' : 'assignmentSomeID', 
        'page', 
        'all')

    const dataMultipleType = {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }
        
    const dataFilter = isPieChartLayout ? dataMultipleType : dataOneType

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Home />
        </ModelQueryClientProvider>
    )
}