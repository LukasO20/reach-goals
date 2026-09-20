import emptyGoal from '../../../assets/empty-goal.svg'
import emptyAssignment from '../../../assets/empty-assignment.svg'
import emptyTag from '../../../assets/empty-tag.svg'

import {
    switchLayoutMap,
    visibilityMap,
} from '../../../utils/mapping/mapping-utils.js'
import { cx } from '../../../utils/utils.js'

import ButtonAction from '../button-action'

import './style.scss'

/** @typedef {import('./types.js').EmptyStateModelProps} Props */

/**
 * @param {Props} props
 */
const EmptyStateModel = ({
    type,
    title,
    description,
    showButtonAction = true,
}) => {
    const buttonTitle = `Create ${type}`
    const buttonClass = cx(
        `create-${type} 
        plan 
        create 
        medium
        `
    )

    const imgSrc =
        type === 'goal'
            ? emptyGoal
            : type === 'assignment'
              ? emptyAssignment
              : emptyTag

    const formRender = switchLayoutMap({
        area: 'modal',
        layout: { modalName: 'modal-center', layoutName: 'form' },
    })

    return (
        <div className='empty-state-model'>
            <label className='title'>{title}</label>
            {description && (
                <label className='description'>{description}</label>
            )}
            <img src={imgSrc} alt={title} />
            {showButtonAction && (
                <ButtonAction
                    classBtn={buttonClass}
                    icon={`icon-${type}`}
                    title={buttonTitle}
                    visibility={visibilityMap(['modal-center', type])}
                    switchLayout={formRender}
                />
            )}
        </div>
    )
}

export default EmptyStateModel
