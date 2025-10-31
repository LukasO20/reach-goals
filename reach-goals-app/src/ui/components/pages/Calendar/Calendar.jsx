import { useEffect, useState, useContext } from 'react'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import MonthDaysPicker from '../../items/elements/MonthDaysPicker/MonthDaysPicker.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

import '../Calendar/Calendar.scss'

const Calendar = () => {
    const { update } = useTitle()
    const { layoutComponent } = useSwitchLayout()
    const { loading: goalLoading, data: dataGoal, refetch: refetchGoal } = useGoalProvider()
    const { loading: assignmentLoading, data: dataAssignment, refetch: refetchAssignment } = useAssignmentProvider()
    const { updateFilterModel } = useContext(ManageModelContext)

    const [dataModelSource, setDataModelSource] = useState({
        goal: [],
        assignment: []
    })

    const filterGetGoal = filterGetModelMap({ goalSomeID: 'all' }, 'goal', 'core')
    const filterGetAssignment = filterGetModelMap({ notGoalRelation: 'all' }, 'assignment', 'core')

    useEffect(() => {
        update({ header: 'Manage your goals and assignments' })
        refetchGoal(updateFilterModel(filterGetGoal, 'goal'))
        refetchAssignment(updateFilterModel(filterGetAssignment, 'assignment'))
    }, [])

    useEffect(() => {
        const currentLayout = layoutComponent.calendar?.layout
        setDataModelSource(prevModel => (
            (!currentLayout || currentLayout === 'default') ? {
                ...prevModel,
                goal: dataGoal ?? [],
                assignment: dataAssignment ?? []
            } : {
                [currentLayout]: currentLayout === 'goal' ? dataGoal :
                    currentLayout === 'assignment' ?
                        dataAssignment : []
            }
        ))
    }, [dataGoal, dataAssignment, layoutComponent.calendar])

    return (
        <div className="container-calendar">
            { (goalLoading || assignmentLoading) ? <Loading /> : null }
            <MonthDaysPicker model={dataModelSource} />
        </div>
    )
}

export default Calendar