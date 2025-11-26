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
        const filter = currentLayout === 'assignment' ?
            filterGetModelMap({
                notGoalRelation: 'all',
                type: currentLayout,
                source: 'core'
            }, currentLayout, 'core')
            :
            filterGetModelMap({
                goalSomeID: 'all',
                type: currentLayout,
                source: 'core'
            }, currentLayout, 'core')
        updateFilterModel(filter, currentLayout, 'page')
    }, [currentLayout])

    return (
        (loadingGoal || loadingAssignment) ?
            <Loading />
            :
            currentLayout === 'pie-chart' ?
                <ContainerChartPie models={pieData} />
                :
                <ContainerColumn modelLayout={currentLayout} />
    )
}

export default Home