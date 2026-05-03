import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider.jsx'
import { useGoalProvider } from '../../../../provider/model/goal-model-provider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider.jsx'

import Loading from '../../items/elements/loading' 
import HomeColumn from './components/home-column.jsx'
import HomeChart from './components/home-chart.jsx'

import './style.scss'

const Home = () => {
    const { data: { layout } } = useSwitchLayout()
    const { page: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()

    const dataPage = {
        goal: dataGoal,
        assignment: dataAssignment
    }
    const layoutHome = layout.page.layoutName
    const validLayouts = ['chart', 'column']

    const isLoading = !!loadingGoal || !!loadingAssignment

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {!isLoading && (
                validLayouts.includes(layoutHome) && (
                    layoutHome === 'chart' ? 
                        (<HomeChart data={dataPage} />) : (<HomeColumn data={dataPage} />)
                )
            )}
        </>
    )

}

export default Home