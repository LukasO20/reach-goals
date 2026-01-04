import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterGetModelMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'

import '../Objectives/Objectives.scss'

const Objectives = () => {
    const { update } = useTitle()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)
    const location = useLocation()

    const layoutObjectives = layout.page.layoutName

    useEffect(() => {
        update({ header: 'Manage your goals and assingments' })
        updateSwitchLayout(switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } }))
    }, [])

    useEffect(() => {
        if (layoutObjectives === 'all') {
            const filterGoal = filterGetModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterGetModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            updateFilterModel(filterGoal, 'goal', 'page')
            updateFilterModel(filterAssignment, 'assignment', 'page')
        }
    }, [layoutObjectives])

    return <ModelTabs />

}

export default Objectives