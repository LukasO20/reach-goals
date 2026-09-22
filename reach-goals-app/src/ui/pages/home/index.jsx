import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'

import Loading from '../../elements/loading'
import EmptyState from '../../elements/empty-state'
import EmptyStateCreate from '../../elements/empty-state/components/empty-state-create.jsx'
import HomeColumn from './components/home-column.jsx'
import HomeChart from './components/home-chart.jsx'

import emptyHomeImg from '../../../assets/empty-activity.svg'

import './style.scss'

const Home = () => {
    const {
        data: { layout, visibility },
    } = useSwitchLayout()
    const {
        page: {
            data: dataGoal = [],
            loading: loadingGoal,
            fetching: fetchingGoal,
        },
    } = useGoalProvider()
    const {
        page: {
            data: dataAssignment = [],
            loading: loadingAssignment,
            fetching: fetchingAssignment,
        },
    } = useAssignmentProvider()

    const dataPage = {
        goal: dataGoal,
        assignment: dataAssignment,
    }
    const layoutHome = layout.page.layoutName
    const visibilityHome = visibility.layoutHome

    const renderHomePage =
        layoutHome === 'chart' ? (
            <HomeChart data={dataPage} />
        ) : (
            <HomeColumn data={dataPage} />
        )

    const isLoading = !!loadingGoal || !!loadingAssignment
    const isEmptyData = !dataGoal.length && !dataAssignment.length && !isLoading
    const isEmptyModelData =
        (!dataGoal.length && visibilityHome === 'goal') ||
        (!dataAssignment.length && visibilityHome === 'assignment')
    const isFetching = (fetchingGoal || fetchingAssignment) && isEmptyModelData

    return (
        <>
            {(isLoading || isFetching) && <Loading mode='block' />}
            {!isLoading && !isEmptyData && !isFetching && renderHomePage}
            {!isLoading && isEmptyData && !isFetching && (
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
