import { useGoalProvider } from '../../../../provider/model/goal-model-provider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider.jsx'

import ModelTabs from '../../items/elements/model-tabs'
import Goal from '../../items/models/goal'
import Assignment from '../../items/models/assignment'
import ModelSwitcher from '../../items/models/model-switcher'
import PopupModelOptions from '../../items/elements/popup-model-options/index.jsx'

import './style.scss'

/** @typedef {import('./types.js').ObjectivesProps} Props */

/**
 * @param {Props} props
 */
const Objectives = ({ filterTabs, onFilterTabs }) => {
    const { data: { visibility } } = useSwitchLayout()
    const { page: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { page: { data: dataAssignment = [], loading: loadingAssignment } } = useAssignmentProvider()

    const typeLayout = visibility.layoutObjectives
    const data = typeLayout === 'goal' ? dataGoal
        : typeLayout === 'assignment' ? dataAssignment
            : [...dataGoal, ...dataAssignment]

    const objectivePropsReference = {
        display: {
            type: [visibility.cards],
            actions: ['edit', 'delete']
        },
        source: data,
        detailsModel: true,
        checkboxModel: true,
        status: visibility.status,
        showTags: visibility.tagsCard
    }

    const isAllModels = typeLayout === 'all-activities'
    const isOnlyTypeModel = typeLayout === 'goal' || typeLayout === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment

    const renderContent = () => {
        return (
            <>
                {isAllModels && !isOnlyTypeModel && (
                    <>
                        <Goal {...objectivePropsReference} />
                        <Assignment {...objectivePropsReference} />
                    </>
                )}
                {isOnlyTypeModel && !isAllModels && (
                    <ModelSwitcher type={typeLayout} propsReference={objectivePropsReference} />
                )}
            </>
        )
    }

    return (
        <>
            <ModelTabs
                type={typeLayout}
                loading={isLoading}
                classModelTabs='objectives'
                filterTabs={filterTabs}
                onFilterTabs={onFilterTabs}
            >
                {renderContent()}
            </ModelTabs>
            <PopupModelOptions type='pop-switch-model' typeSwitchModelOptions='objectives' onFilterTabs={onFilterTabs} />
        </>
    )
}

export default Objectives