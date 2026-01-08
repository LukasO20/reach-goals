import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterGetModelMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import CardMini from '../../items/elements/CardMini/CardMini.jsx'

import '../Objectives/Objectives.scss'

const Objectives = () => {
    const { update } = useTitle()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)
    const { page: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment = [], loading: loadingAssignment } } = useAssignmentProvider()
    const location = useLocation()

    const typeLayout = layout.page.layoutName
    const display = { type: 'card-mini' }
    const models =
        Array.isArray(dataGoal) || Array.isArray(dataAssignment) ?
            {
                goal: dataGoal,
                assignment: dataAssignment
            } :
            {
                goal: [],
                assignment: []
            }

    const isAllModels = typeLayout === 'all'
    const isOnlyTypeModel = typeLayout === 'goal' || typeLayout === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment

    useEffect(() => {
        update({ header: 'Manage your goals and assingments' })
        updateSwitchLayout(switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } }))
    }, [])

    useEffect(() => {
        if (typeLayout === 'all') {
            const filterGoal = filterGetModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterGetModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            updateFilterModel(filterGoal, 'goal', 'page')
            updateFilterModel(filterAssignment, 'assignment', 'page')
        }
    }, [typeLayout])

    let content = null

    if (isAllModels) {
        content = (
            <>
                <CardMini type='goal' model={models.goal} display={display} />
                <CardMini type='assignment' model={models.assignment} display={display} />
            </>
        )
    } else if (isOnlyTypeModel) {
        content = <CardMini type={typeLayout} model={models[typeLayout]} display={display} />
    }

    return <ModelTabs type={typeLayout} children={content} loading={isLoading} />
}

export default Objectives