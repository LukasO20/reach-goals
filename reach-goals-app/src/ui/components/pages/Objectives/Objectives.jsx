import { useContext, useEffect } from 'react'


import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'

import '../Objectives/Objectives.scss'

const Objectives = () => {
    const { update } = useTitle()
    const { layoutComponent } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)

    const type = layoutComponent.objectives.layout
    const currentLayout = layoutComponent.objectives.layout

    useEffect(() => {
        update({ header: 'Manage your goals and assingments' })
    }, [])

    useEffect(() => {
        if (currentLayout === 'default') {
            const filterGoal = filterGetModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterGetModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            updateFilterModel(filterGoal, 'goal', 'page')
            updateFilterModel(filterAssignment, 'assignment', 'page')
        }
    }, [currentLayout])

    return (
        <div className='container-objectives'>
            <ModelTabs type={type} />
        </div>
    )
}

export default Objectives