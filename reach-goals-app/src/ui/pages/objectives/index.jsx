import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'

import { cx } from '../../../utils/utils.js'

import ModelTabs from '../../elements/model-tabs'
import Goal from '../../models/goal'
import Assignment from '../../models/assignment'
import ModelSwitcher from '../../models/model-switcher'
import PopupModelOptions from '../../elements/popup-model-options/index.jsx'
import EmptyState from '../../elements/empty-state'
import EmptyStateCreate from '../../elements/empty-state/components/empty-state-create.jsx'

import emptyObjectivesImg from '../../../assets/empty-activity-objectives.svg'

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

    const propsReference = {
        display: {
            type: [visibility.cards],
            actions: ['edit', 'delete']
        },
        detailsModel: true,
        checkboxModel: true,
        status: visibility.status,
        showTags: visibility.tagsCard
    }

    const dataSingle = typeLayout === 'goal' ? dataGoal : dataAssignment

    const switchActivityPropsReference = {
        ...propsReference,
        source: dataSingle
    }

    const goalPropsReference = {
        ...propsReference,
        source: dataGoal
    }

    const assignmentPropsReference = {
        ...propsReference,
        source: dataAssignment
    }

    const isAllModels = typeLayout === 'all-activities'
    const isOnlyTypeModel = typeLayout === 'goal' || typeLayout === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment
    const isEmptyData = !dataGoal?.length && !dataAssignment?.length && !isLoading

    const modelTabsClass = cx(
        `objectives
        ${isEmptyData && 'empty'}`
    )

    const renderContent = (
        <>
            {isAllModels && !isOnlyTypeModel && !isEmptyData && (
                <>
                    <Goal {...goalPropsReference} />
                    <Assignment {...assignmentPropsReference} />
                </>
            )}
            {isOnlyTypeModel && !isAllModels && !isEmptyData && (
                <ModelSwitcher type={typeLayout} propsReference={switchActivityPropsReference} />
            )}
            {!isLoading && isEmptyData && (
                <EmptyState
                    title="There's nothing an activity yet"
                    description='You can create a goal or assignment to manage your activities'
                    imgSrc={emptyObjectivesImg}
                >
                    <EmptyStateCreate />
                </EmptyState>)
            }
        </>
    )

    return (
        <>
            <ModelTabs
                type={typeLayout}
                loading={isLoading}
                classModelTabs={modelTabsClass}
                filterTabs={filterTabs}
                onFilterTabs={onFilterTabs}
            >
                {renderContent}
            </ModelTabs>
            <PopupModelOptions type='pop-switch-model' typeSwitchModelOptions='objectives' onFilterTabs={onFilterTabs} mode={visibility.layoutPopupModel} />
        </>
    )
}

export default Objectives