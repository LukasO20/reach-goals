import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'

import MonthDaysPicker from '../../items/elements/month-days-picker' 
import Loading from '../../items/elements/loading' 

const Calendar = () => {
    const { page: { loading: loadingGoal, data: dataGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment, data: dataAssignment } } = useAssignmentProvider()

    const dataPage = {
        goal: dataGoal,
        assignment: dataAssignment
    }

    const isLoading = !!loadingGoal || !!loadingAssignment
    const isValidData = Array.isArray(dataPage.goal) || Array.isArray(dataPage.assignment)

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {isValidData && <MonthDaysPicker data={dataPage} />}
        </>
    )
}

export default Calendar