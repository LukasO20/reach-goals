import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useTitle } from '../../../../provider/ui/title-provider'

import { ModelQueryClientProvider } from '../../../../provider/model/model-queryclient-provider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'
import { switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import Objectives from '.'

export const ObjectivesWrapper = () => {
    const [filterTabs, setFilterTabs] = useState(null)
    const { updateSwitchLayout } = useSwitchLayout()
    const { update } = useTitle()
    const location = useLocation()

    const dataFilter = filterTabs ?? {
        ...buildFilterModelMap('goal', 'goalSomeID', 'page', 'all'),
        ...buildFilterModelMap('assignment', 'assignmentSomeID', 'page', 'all')
    }

    useEffect(() => {
        const dataSwitchLayout = switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } })

        update({ header: 'Manage your activities' })
        updateSwitchLayout(dataSwitchLayout)
    }, [update, updateSwitchLayout, location.pathname])

    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <Objectives onFilterTabs={setFilterTabs} />
        </ModelQueryClientProvider>
    )
}