import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'

import Loading from '../../items/elements/loading/index.jsx'
import ContainerColumn from './elements/container-column.jsx'
import ContainerChartPie from './elements/container-chartpie.jsx'

import './style.scss'

const Home = () => {
    const { data: { layout } } = useSwitchLayout()
    const { page: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()

    const dataPage = {
        goal:dataGoal,
        assignment: dataAssignment
    }
    const layoutHome = layout.page.layoutName
    const validLayouts = ['pie-chart', 'goal', 'assignment']

    const isLoading = !!loadingGoal || !!loadingAssignment

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {!isLoading && (
                validLayouts.includes(layoutHome) && (
                    layoutHome === 'pie-chart' ? 
                        (<ContainerChartPie data={dataPage} />) : (<ContainerColumn data={dataPage} />)
                )
            )}
        </>
    )

}

export default Home