import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider/index.jsx'

import MonthDaysPicker from '../../elements/month-days-picker'
import Loading from '../../elements/loading'
import PopupModelOptions from '../../elements/popup-model-options/index.jsx'
import EmptyState from '../../elements/empty-state'
import EmptyStateCreate from '../../elements/empty-state/components/empty-state-create.jsx'

import emptyCalendarImg from '../../../assets/empty-activity-calendar.svg'

import './style.scss'

const Calendar = () => {
    const {
        page: { loading: loadingGoal, data: dataGoal, fetching: fetchingGoal },
    } = useGoalProvider()
    const {
        page: {
            loading: loadingAssignment,
            data: dataAssignment,
            fetching: fetchingAssignment,
        },
    } = useAssignmentProvider()
    const {
        data: { visibility },
    } = useSwitchLayout()

    const visibilityCalendar = visibility.layoutCalendar

    const dataPage = {
        goal: dataGoal,
        assignment: dataAssignment,
    }

    const isLoading = !!loadingGoal || !!loadingAssignment
    const isValidData =
        Array.isArray(dataPage.goal) || Array.isArray(dataPage.assignment)
    const isEmptyData =
        !dataGoal?.length && !dataAssignment?.length && !isLoading
    const isEmptyModelData =
        (!dataGoal.length && visibilityCalendar === 'goal') ||
        (!dataAssignment.length && visibilityCalendar === 'assignment')
    const isFetching = (fetchingGoal || fetchingAssignment) && isEmptyModelData

    return (
        <>
            {(isLoading || isFetching) && <Loading mode='block' />}
            {!isLoading && !isEmptyData && isValidData && !isFetching && (
                <>
                    <MonthDaysPicker data={dataPage} />
                    <PopupModelOptions
                        type='pop-switch-model'
                        typeSwitchModelOptions='calendar'
                        mode={visibility.layoutPopupModel}
                    />
                </>
            )}
            {!isLoading && isEmptyData && !isFetching && (
                <EmptyState
                    title="There's nothing an activity yet"
                    description='You can create a goal or assignment to set a date and start your schedule'
                    imgSrc={emptyCalendarImg}
                >
                    <EmptyStateCreate />
                </EmptyState>
            )}
        </>
    )
}

export default Calendar
