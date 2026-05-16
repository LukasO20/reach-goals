import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'

import MonthDaysPicker from '../../items/elements/month-days-picker'
import Loading from '../../items/elements/loading'
import PopupModelOptions from '../../items/elements/popup-model-options/index.jsx'

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
            <PopupModelOptions type='pop-switch-model' typeSwitchModelOptions='calendar' />
        </>
    )
}

export default Calendar