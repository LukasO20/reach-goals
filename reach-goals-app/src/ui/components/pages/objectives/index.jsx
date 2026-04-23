import { useGoalProvider } from '../../../../provider/model/goal-model-provider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider.jsx'

import ModelTabs from '../../items/elements/model-tabs'
import Goal from '../../items/models/goal'
import Assignment from '../../items/models/assignment'
import ModelSwitcher from '../../items/models/model-switcher'

import './style.scss'

/** @typedef {import('./types.js').ObjectivesProps} Props */

/**
 * @param {Props} props
 */
const Objectives = ({ onFilterTabs }) => {
    const { data: { layout, visibility } } = useSwitchLayout()
    const { page: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment = [], loading: loadingAssignment } } = useAssignmentProvider()

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