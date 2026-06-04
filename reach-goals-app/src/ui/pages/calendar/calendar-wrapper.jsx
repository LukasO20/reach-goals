import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useTitle } from '../../../provider/ui/title-provider'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'

import { switchLayoutMap } from '../../../utils/mapping/mappingUtils'

import Calendar from '.'

export const CalendarWrapper = () => {
    const { setSwitchLayout } = useSwitchLayout()
    const { update } = useTitle()
    const location = useLocation()

    useEffect(() => {
        const dataSwitchLayout = switchLayoutMap({ area: 'page', layout: { pageName: location.pathname.slice(1), layoutName: 'all' } })

        update({ header: 'Manage daily your activities' })
        setSwitchLayout(dataSwitchLayout)
    }, [update, setSwitchLayout, location.pathname])

    return (
        <ModelQueryClientProvider>
            <Calendar />
        </ModelQueryClientProvider>
    )
}