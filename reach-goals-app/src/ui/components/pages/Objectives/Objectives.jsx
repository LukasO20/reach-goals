import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useManageModel } from '../../../../provider/ManageModelProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterBuildModelMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import Goal from '../../items/models/Goal/Goal.jsx'
import Assignment from '../../items/models/Assignment/Assignment.jsx'
import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'

import '../Objectives/Objectives.scss'

const Objectives = () => {
    const { update } = useTitle()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const { updateFilterModel } = useManageModel()
    const { page: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()
    const location = useLocation()

    const typeLayout = layout.page.layoutName
    const currentData = typeLayout === 'goal' ? dataGoal : typeLayout === 'assignment' ? dataAssignment : []
    const modelProps = {
        display: {
            type: ['card-mini'],
            actions: []
        },
        detailsModel: true,
        source: currentData
    }

    const isAllModels = typeLayout === 'all'
    const isOnlyTypeModel = typeLayout === 'goal' || typeLayout === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment

    useEffect(() => {
        const dataSwitchLayout = switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } })

        update({ header: 'Manage your goals and assingments' })
        updateSwitchLayout(dataSwitchLayout)
    }, [update, updateSwitchLayout, location.pathname])

    useEffect(() => {
        if (typeLayout === 'all') {
            const filterGoal = filterBuildModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterBuildModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            const dataUpdateFilterModelGoal = updateFilterModelMap({ filter: filterGoal, model: 'goal', scope: 'page' })
            const dataUpdateFilterModelAssignment = updateFilterModelMap({ filter: filterAssignment, model: 'assignment', scope: 'page' })

            updateFilterModel(dataUpdateFilterModelGoal)
            updateFilterModel(dataUpdateFilterModelAssignment)
        }
    }, [typeLayout, updateFilterModel])

    let content = null

    if (isAllModels) {
        content = (
            <>
                <Goal display={modelProps.display} detailsModel={true} source={dataGoal} />
                <Assignment display={modelProps.display} detailsModel={true} source={dataAssignment} />
            </>
        )
    } else if (isOnlyTypeModel) {
        content = <ModelSwitcher type={typeLayout} propsReference={modelProps} />
    }

    return <ModelTabs type={typeLayout} children={content} loading={isLoading} />
}

export default Objectives