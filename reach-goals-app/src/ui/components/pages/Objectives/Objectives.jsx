import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTitle } from '../../../../provider/ui/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'

import { switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import Goal from '../../items/models/Goal/Goal.jsx'
import Assignment from '../../items/models/Assignment/Assignment.jsx'
import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'

import './Objectives.scss'

export const ObjectivesMap = {
    onFilterTabs: null
}

/**
 * @param {Object} ObjectivesMap
 * @param {function} ObjectivesMap.onFilterTabs
 */

const Objectives = ({ onFilterTabs } = ObjectivesMap) => {
    const { update } = useTitle()
    const { data: { layout, visibility }, updateSwitchLayout } = useSwitchLayout()
    const { page: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment = [], loading: loadingAssignment } } = useAssignmentProvider()
    const location = useLocation()

    const typeLayout = layout.page.layoutName
    const currentData = typeLayout === 'goal' ? dataGoal : typeLayout === 'assignment' ? dataAssignment : []
    const switcherModelPropsReference = {
        display: {
            type: [visibility.cards],
            actions: ['edit', 'delete']
        },
        detailsModel: true,
        source: currentData,
        checkboxModel: true,
        status: visibility.status,
        showTags: true
    }

    const isAllModels = typeLayout === 'all'
    const isOnlyTypeModel = typeLayout === 'goal' || typeLayout === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment

    useEffect(() => {
        const dataSwitchLayout = switchLayoutMap({ area: 'page', state: { pageName: location.pathname.slice(1), layoutName: 'all' } })

        update({ header: 'Manage your goals and assignments' })
        updateSwitchLayout(dataSwitchLayout)
    }, [update, updateSwitchLayout, location.pathname])

    return (
        <ModelTabs type={typeLayout} loading={isLoading} classModelTabs='objectives' onFilterTabs={onFilterTabs}>
            {isAllModels && !isOnlyTypeModel && (
                <>
                    <Goal
                        display={switcherModelPropsReference.display}
                        detailsModel={true}
                        source={dataGoal}
                        checkboxModel={true}
                        status={switcherModelPropsReference.status}
                        showTags={visibility.tagsCard}
                    />
                    <Assignment
                        display={switcherModelPropsReference.display}
                        detailsModel={true}
                        source={dataAssignment}
                        checkboxModel={true}
                        status={switcherModelPropsReference.status}
                        showTags={visibility.tagsCard}
                    />
                </>
            )}
            {isOnlyTypeModel && !isAllModels && (
                <ModelSwitcher type={typeLayout} propsReference={switcherModelPropsReference} />
            )}
        </ModelTabs>
    )
}

export default Objectives