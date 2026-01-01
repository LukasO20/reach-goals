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

    const layoutHome = layoutComponent.home.layout
    const validLayouts = ['pie-chart', 'goal', 'assignment']
    const pieData = {
        goal: dataGoal ?? [],
        assignment: dataAssignment ?? []
    }

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [])

    useEffect(() => {
        if (layoutHome === 'goal' || layoutHome === 'assignment') {
            const key = layoutHome === 'assignment' ? 'notGoalRelation' : 'goalSomeID'
            const filter = filterGetModelMap(
                { [key]: 'all', type: layoutHome, source: 'core' },
                layoutHome,
                'core'
            )
            updateFilterModel(filter, layoutHome, 'page')
        }

        if (layoutHome === 'pie-chart') {
            const filterGoal = filterGetModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterGetModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            updateFilterModel(filterGoal, 'goal', 'page')
            updateFilterModel(filterAssignment, 'assignment', 'page')
        }
    }, [layoutHome])

    const isLoading = !!loadingGoal || !!loadingAssignment

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {!isLoading && (
                validLayouts.includes(layoutHome) && (
                    layoutHome === 'pie-chart' ? (
                        <ContainerChartPie data={pieData} />
                    ) : (
                        <ContainerColumn />
                    )
                )
            )}
        </>
    )

}

export default Home