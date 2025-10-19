import { useEffect, useState } from 'react'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentModel } from '../../../../provider/model/AssignmentModelProvider.jsx'

import { filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import MonthDaysPicker from '../../items/elements/MonthDaysPicker/MonthDaysPicker.jsx'

const Calendar = () => {
    const { update } = useTitle()
    //const { data: dataGoal, refetch: refetchGoal } = useGoalModel()
    const { data: dataAssignment, refetch: refetchAssignment } = useAssignmentModel()
    const [activeModelSource, setActiveModelSource] = useState({
        goal: [],
        assignment: []
    })

    const filterGetGoal = filterGetModelMap({ goalSomeID: 'all' }, 'goal', 'core')
    const filterGetAssignment = filterGetModelMap({ notGoalRelation: 'all' }, 'assignment', 'core')

    useEffect(() => {
        update({ header: 'Manage your goals and assignments' })

        const fetch = async () => {
            //await refetchGoal(filterGetGoal)
            await refetchAssignment(filterGetAssignment)
        }

        fetch()
    }, [])

    useEffect(() => {
        setActiveModelSource(prevModel => (
            {
                ...prevModel,
                //goal: dataGoal ?? [],
                assignment: dataAssignment ?? []
            }
        ))
    }, [/*dataGoal*/, dataAssignment])

    return (
        <div className="container-calendar">
            <MonthDaysPicker model={activeModelSource} />
        </div>
    )
}

export default Calendar