import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'

import Loading from '../../items/elements/loading'
import EmptyState from '../../items/elements/empty-state'
import EmptyStateCreate from '../../items/elements/empty-state/components/empty-state-create.jsx'
import HomeColumn from './components/home-column.jsx'
import HomeChart from './components/home-chart.jsx'

import emptyHomeImg from '../../../assets/empty-activity.svg'

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

    const renderHomePage = layoutHome === 'chart' ? <HomeChart data={dataPage} /> : <HomeColumn data={dataPage} />

    const isLoading = !!loadingGoal || !!loadingAssignment
    const isEmptyData = !dataGoal?.length && !dataAssignment?.length && !isLoading

    return (
        <>
            {isLoading && !isEmptyData && <Loading mode='block' />}
            {!isLoading && !isEmptyData && renderHomePage}
            {!isLoading && isEmptyData && (
                <EmptyState
                    title="There's nothing an activity yet"
                    description='You can create a goal or assignment to start your productivity day :)'
                    imgSrc={emptyHomeImg}
                >
                    <EmptyStateCreate />
                </EmptyState>
            )}
        </>
    )
}

export default Home