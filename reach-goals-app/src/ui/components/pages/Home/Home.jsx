import { useEffect, useContext } from 'react'

import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { filterBuildModelMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import Loading from '../../items/elements/Loading/Loading.jsx'
import ContainerColumn from './ContainerColumn.jsx'
import ContainerChartPie from './ContainerChartPie.jsx'

import './Home.scss'

const Home = () => {
    const { update } = useTitle()
    const { layout } = useSwitchLayout()
    const { page: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()
    const { updateFilterModel } = useContext(ManageModelContext)

    const layoutHome = layout.page.layoutName
    const validLayouts = ['pie-chart', 'goal', 'assignment']
    const pieData = {
        goal: dataGoal ?? [],
        assignment: dataAssignment ?? []
    }

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [update])

    useEffect(() => {
        if (layoutHome === 'goal' || layoutHome === 'assignment') {
            const key = layoutHome === 'assignment' ? 'notGoalRelation' : 'goalSomeID'
            const filter = filterBuildModelMap({ [key]: 'all', type: layoutHome, source: 'core' }, layoutHome, 'core')   
            const data = updateFilterModelMap({ filter, model: layoutHome, scope: 'page' })
            updateFilterModel(data)
        }

        if (layoutHome === 'pie-chart') {
            ['goal', 'assignment'].forEach(type => {
                const filter = filterBuildModelMap({ [`${type}SomeID`]: 'all', type, source: 'core' }, type, 'core')
                const data = updateFilterModelMap({ filter, model: type, scope: 'page' })
                updateFilterModel(data)
            })
        }
    }, [layoutHome, updateFilterModel])

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