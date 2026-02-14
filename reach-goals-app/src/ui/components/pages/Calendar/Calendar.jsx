import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { useManageModel } from '../../../../provider/ManageModelProvider.jsx'

import { filterBuildModelMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import MonthDaysPicker from '../../items/elements/MonthDaysPicker/MonthDaysPicker.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

import '../Calendar/Calendar.scss'

const Calendar = () => {
    const { update } = useTitle()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const { page: { loading: loadingGoal, data: dataGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment, data: dataAssignment } } = useAssignmentProvider()
    const { updateFilterModel } = useManageModel()
    const location = useLocation()

    const [dataModelSource, setDataModelSource] = useState({
        goal: [],
        assignment: []
    })

    useEffect(() => {
        const filterGoal = filterBuildModelMap({ goalSomeID: 'all' }, 'goal', 'core')
        const filterAssignment = filterBuildModelMap({ notGoalRelation: 'all' }, 'assignment', 'core')

        const dataUpdateFilterModelGoal = updateFilterModelMap({ filter: filterGoal, model: 'goal', scope: 'page' })
        const dataUpdateFilterModelAssignment = updateFilterModelMap({ filter: filterAssignment, model: 'assignment', scope: 'page' })

        update({ header: 'Manage your goals and assignments' })
        updateFilterModel(dataUpdateFilterModelGoal)
        updateFilterModel(dataUpdateFilterModelAssignment)

        const dataSwitchLayout = switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } })
        updateSwitchLayout(dataSwitchLayout)
    }, [update, updateFilterModel, updateSwitchLayout, location.pathname])

    useEffect(() => {
        const currentLayout = layout.page.layoutName
        setDataModelSource(prevModel => (
            (!currentLayout || currentLayout === 'all') ? {
                ...prevModel,
                goal: dataGoal ?? [],
                assignment: dataAssignment ?? []
            } : {
                [currentLayout]: currentLayout === 'goal' ? dataGoal :
                    currentLayout === 'assignment' ?
                        dataAssignment : []
            }
        ))
    }, [dataGoal, dataAssignment, layout.page.layoutName])

    const isLoading = !!loadingGoal || !!loadingAssignment
    const isValidData = Array.isArray(dataModelSource.goal) || Array.isArray(dataModelSource.assignment)

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {isValidData && <MonthDaysPicker data={dataModelSource} />}
        </>
    )
}

export default Calendar