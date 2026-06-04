import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useTitle } from '../../../provider/ui/title-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider/index.jsx'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'

import { switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import Objectives from '.'

export const ObjectivesWrapper = () => {
    const { setSwitchLayout } = useSwitchLayout()
    const { model: { filter: filterModel }, setFilterModel, resetManageModel } = useManageModel()
    const { update } = useTitle()
    const location = useLocation()

    /** @param {Object} filter */
    const handleFilterTabs = (filter) => {
        if (!filter) return resetManageModel({ keys: ['filter'] })
        
        const type = Object.keys(filter)[0]
        setFilterModel(filter, type)
    }

    useEffect(() => {
        const dataSwitchLayout = switchLayoutMap({ area: 'page', layout: { pageName: location.pathname.slice(1), layoutName: 'all' } })

        update({ header: 'Manage your activities' })
        setSwitchLayout(dataSwitchLayout)
    }, [update, setSwitchLayout, location.pathname])

    return (
        <ModelQueryClientProvider>
            <Objectives filterTabs={filterModel} onFilterTabs={handleFilterTabs} />
        </ModelQueryClientProvider>
    )
}