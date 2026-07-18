import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'

import { cx } from '../../../utils/utils.js'
import {
    resetManageModelMap,
    updateActiveModelMap,
    removeFromSelectedModelMap,
} from '../../../utils/mapping/mappingUtilsProvider.js'

import Loading from '../loading'
import Icons from '../icons'

import './style.scss'

/** @typedef {import('./types.js').ButtonActionsProps} Props */

/**
 * @param {Props} props
 */
const ButtonAction = ({
    visibility,
    switchLayout,
    nullForm,
    unlinkGoal,
    onClick,
    pendingState,
    disable,
    icon,
    title,
    classBtn,
    innerRef,
    ...rest
}) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()
    const {
        model,
        resetManageModel,
        updateActiveModel,
        removeFromSelectedModel,
    } = useManageModel()

    const statusButton = (classBtn, providervisibleElements = []) => {
        if (!providervisibleElements) {
            return false
        }
        return providervisibleElements.includes(classBtn)
    }

    const classBtnAction = classBtn.split(' ')[2]
    const isOn = statusButton(classBtnAction, visibleElements)

    const handleClick = (e) => {
        e.stopPropagation()

        const dataResetManageModel = resetManageModelMap([
            'activeModel',
            'mainModelID',
            'selectedModel',
        ])

        if (visibility) toggleVisibility(visibility, e)
        if (switchLayout) setSwitchLayout(switchLayout)
        if (nullForm) resetManageModel(dataResetManageModel)
        if (unlinkGoal) {
            const dataEmptyGoal = updateActiveModelMap({
                keyObject: 'goal',
                value: null,
                action: 'remove',
            })
            const dataEmptyGoalID = updateActiveModelMap({
                keyObject: 'goalID',
                value: null,
                action: 'remove',
            })
            const dataRemoveFromSelectedModel = removeFromSelectedModelMap({
                id: model.activeModel.goalID,
                type: 'goal',
            })

            updateActiveModel(dataEmptyGoal)
            updateActiveModel(dataEmptyGoalID)
            removeFromSelectedModel(dataRemoveFromSelectedModel)
        }

        if (typeof onClick === 'function') {
            // execute external function from 'onClick' external attribute, and share properties according neccessity (can be expand)
            const externalPropsShare = {
                event: e,
            }
            onClick(externalPropsShare)
        }
    }

    const buttonActionClass = cx(
        `button-action 
        ${classBtn} 
        ${isOn && 'on'} 
        ${pendingState && 'pending'} 
        ${disable && 'disable'}
        `
    )

    return (
        <span
            ref={innerRef}
            className={buttonActionClass}
            onClick={handleClick}
            onKeyDown={(e) => (e.key === 'Enter' ? handleClick(e) : '')}
            role='button'
            tabIndex='0'
            {...rest}
        >
            {pendingState ? <Loading mode='inline' /> : <Icons icon={icon} />}
            {title && <span className='button-title'>{title}</span>}
        </span>
    )
}

export default ButtonAction
