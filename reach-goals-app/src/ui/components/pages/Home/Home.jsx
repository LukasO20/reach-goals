import { useEffect, useContext } from 'react'

import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import Loading from '../../items/elements/Loading/Loading.jsx'
import ContainerColumn from './ContainerColumn.jsx'
import ContainerChartPie from './ContainerChartPie.jsx'

import './Home.scss'

const Home = () => {
    const { update } = useTitle()
    const { layoutComponent } = useSwitchLayout()
    const { page: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()
    const { updateFilterModel } = useContext(ManageModelContext)

    const currentLayout = layoutComponent.home.layout
    const pieData = {
        goal: dataGoal,
        assignment: dataAssignment
    }

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [])

    useEffect(() => {
        if (currentLayout === 'goal' || currentLayout === 'assignment') {
            const key = currentLayout === 'assignment' ? 'notGoalRelation' : 'goalSomeID'
            const filter = filterGetModelMap(
                {[key]: 'all', type: currentLayout, source: 'core' },
                currentLayout,
                'core'
            )
            updateFilterModel(filter, currentLayout, 'page')
        }

        if (currentLayout === 'pie-chart') {
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
        (loadingGoal || loadingAssignment) ?
            <Loading />
            :
            currentLayout === 'pie-chart' ?
                <ContainerChartPie data={pieData}/>
                :
                <ContainerColumn modelLayout={currentLayout} />
    )
}

export default Home