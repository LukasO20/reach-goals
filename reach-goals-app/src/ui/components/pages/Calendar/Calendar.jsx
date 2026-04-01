import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTitle } from '../../../../provider/ui/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'

import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'

import { filterBuildModelMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import MonthDaysPicker from '../../items/elements/MonthDaysPicker/MonthDaysPicker.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

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