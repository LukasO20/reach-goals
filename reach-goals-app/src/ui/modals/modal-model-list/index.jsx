import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useTagProvider } from '../../../provider/model/tag-model-provider'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'

import { cx } from '../../../utils/utils.js'
import { visibilityMap } from '../../../utils/mapping/mapping-utils.js'

import ButtonAction from '../../elements/button-action'
import Loading from '../../elements/loading'
import ModelSwitcher from '../../models/model-switcher'
import EmptyStateModel from '../../elements/empty-state-model'

import './style.scss'

/** @typedef {import('./types.js').ModalModelListProps} Props */

/**
 * @param {Props} props
 */
const ModalModelList = ({ title, type }) => {
    const {
        modal: { data: dataGoal = [], loading: loadingGoal },
    } = useGoalProvider()
    const {
        modal: { data: dataAssignment = [], loading: loadingAssigment },
    } = useAssignmentProvider()
    const {
        modal: { data: dataTag = [], loading: loadingTag },
    } = useTagProvider()

    const currentData =
        type === 'goal'
            ? dataGoal
            : type === 'assignment'
              ? dataAssignment
              : dataTag

    const displayModesProps = {
        type: ['card-mini'],
        actions: [],
    }

    const propsReference = {
        display: displayModesProps,
        source: currentData,
    }

    const isLoading = !!loadingGoal || !!loadingAssigment || !!loadingTag

    const isGoalEmpty = !dataGoal.length && type === 'goal'
    const isAssignmentEmpty = !dataAssignment.length && type === 'assignment'
    const isTagEmpty = !dataTag.length && type === 'tag'

    const shoulRenderEmptyStateModel =
        isGoalEmpty || isAssignmentEmpty || isTagEmpty

    const containerListModalClass = cx(
        `container-list-modal
        ${type}
        ${shoulRenderEmptyStateModel && 'empty'}
        `
    )

    return (
        <div
            className={containerListModalClass}
            onClick={(e) => e.stopPropagation()}
        >
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction
                    visibility={visibilityMap(`modal-model-list-${type}`, {
                        remove: true,
                    })}
                    classBtn='circle close'
                    icon='icon-close'
                />
            </div>
            <div className='body scrollable'>
                {isLoading && <Loading mode='block' />}
                {!isLoading && !shoulRenderEmptyStateModel && (
                    <ModelSwitcher
                        type={type}
                        selectableModel={true}
                        propsReference={propsReference}
                    />
                )}
                {!isLoading && shoulRenderEmptyStateModel && (
                    <EmptyStateModel
                        type={type}
                        title='No results found'
                        description={`There are no ${type}s to display here`}
                        showButtonAction={false}
                    />
                )}
            </div>
        </div>
    )
}

export default ModalModelList
