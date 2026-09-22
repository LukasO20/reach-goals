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
import EmptyStateModel from '../../elements/empty-state-model'

import emptyObjectivesImg from '../../../assets/empty-activity-objectives.svg'

import './style.scss'

/** @typedef {import('./types.js').ObjectivesProps} Props */

/**
 * @param {Props} props
 */
const Objectives = ({ filterTabs, onFilterTabs }) => {
    const {
        data: { visibility },
    } = useSwitchLayout()
    const {
        page: {
            data: dataGoal = [],
            loading: loadingGoal,
            fetching: fetchingGoal,
        },
    } = useGoalProvider()
    const {
        page: {
            data: dataAssignment = [],
            loading: loadingAssignment,
            fetching: fetchingAssignment,
        },
    } = useAssignmentProvider()

    const visibilityObjectives = visibility.layoutObjectives

    const propsReference = {
        display: {
            type: [visibility.cards],
            actions: ['edit', 'delete'],
        },
        detailsModel: true,
        checkboxModel: true,
        status: visibility.status,
        showTags: visibility.tagsCard,
    }

    const dataSingle =
        visibilityObjectives === 'goal' ? dataGoal : dataAssignment

    const switchActivityPropsReference = {
        ...propsReference,
        source: dataSingle,
    }

    const goalPropsReference = {
        ...propsReference,
        source: dataGoal,
    }

    const assignmentPropsReference = {
        ...propsReference,
        source: dataAssignment,
    }

    const isAllModels = visibilityObjectives === 'all-activities'
    const isOnlyTypeModel =
        visibilityObjectives === 'goal' || visibilityObjectives === 'assignment'
    const isLoading = !!loadingGoal || !!loadingAssignment
    const isEmptyData = !dataGoal.length && !dataAssignment.length && !isLoading
    const isEmptyModelData =
        (!dataGoal.length && visibilityObjectives === 'goal') ||
        (!dataAssignment.length && visibilityObjectives === 'assignment')
    const isFetching = (fetchingGoal || fetchingAssignment) && isEmptyModelData

    const shoulRenderEmptyStateModel = isEmptyModelData && !isEmptyData

    const modelTabsClass = cx(
        `objectives
        ${isEmptyData && 'empty'}
        ${shoulRenderEmptyStateModel && 'no-model'}
        `
    )

    const renderContent = (
        <>
            {isAllModels && !isOnlyTypeModel && !isEmptyData && !isFetching && (
                <>
                    <Goal {...goalPropsReference} />
                    <Assignment {...assignmentPropsReference} />
                </>
            )}
            {isOnlyTypeModel && !isAllModels && !isEmptyData && !isFetching && (
                <ModelSwitcher
                    type={visibilityObjectives}
                    propsReference={switchActivityPropsReference}
                />
            )}
            {shoulRenderEmptyStateModel && !isFetching && (
                <EmptyStateModel
                    type={visibilityObjectives}
                    title='No results found'
                    description={`There are no ${visibilityObjectives}s to display here`}
                    showButtonAction={false}
                />
            )}
            {!isLoading && isEmptyData && !isFetching && (
                <EmptyState
                    title="There's nothing an activity yet"
                    description='You can create a goal or assignment to manage your activities'
                    imgSrc={emptyObjectivesImg}
                >
                    <EmptyStateCreate />
                </EmptyState>
            )}
        </>
    )

    return (
        <>
            <ModelTabs
                type={visibilityObjectives}
                loading={isLoading || isFetching}
                classModelTabs={modelTabsClass}
                filterTabs={filterTabs}
                onFilterTabs={onFilterTabs}
            >
                {renderContent}
            </ModelTabs>
            {!isEmptyData && (
                <PopupModelOptions
                    type='pop-switch-model'
                    typeSwitchModelOptions='objectives'
                    onFilterTabs={onFilterTabs}
                    mode={visibility.layoutPopupModel}
                />
            )}
        </>
    )
}

export default Objectives
