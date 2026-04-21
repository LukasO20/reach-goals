import { useVisibility } from '../../../../../provider/ui/visibility-provider.jsx'
import { useManageModel } from '../../../../../provider/model/manage-model-provider.jsx'
import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider.jsx'

import { cx } from '../../../../../utils/utils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { resetManageModelMap, updateFormModelMap, removeFromSelectedModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Loading from '../loading'

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
    classBtn
}) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { model, resetManageModel, updateFormModel, removeFromSelectedModel } = useManageModel()

    const statusButton = (classBtn, providervisibleElements = []) => {
        if (!providervisibleElements) { return false }
        return providervisibleElements.includes(classBtn)
    }

    const classBtnAction = classBtn.split(' ')[2]
    const isOn = statusButton(classBtnAction, visibleElements)

    const handleClick = (e) => {
        e.stopPropagation()

        const dataResetManageModel = resetManageModelMap(['formModel', 'mainModelID', 'selectedModel'])
        const dataUpdateFormModel = updateFormModelMap({ keyObject: 'goalID', value: null, action: 'remove' })
        const dataRemoveFromSelectedModel = removeFromSelectedModelMap({ id: model.formModel.goalID, type: 'goal' })

        if (visibility) toggleVisibility(visibility, e)
        if (switchLayout) updateSwitchLayout(switchLayout)
        if (nullForm) resetManageModel(dataResetManageModel)
        if (unlinkGoal) {
            updateFormModel(dataUpdateFormModel)
            removeFromSelectedModel(dataRemoveFromSelectedModel)
        }

        if (typeof onClick === 'function') {
            // execute external function from 'onClick' external attribute, and share properties according neccessity (can be expand)
            const externalPropsShare = {
                event: e
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
        <span className={buttonActionClass}
            onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            {pendingState ? <Loading mode='inline' /> : icon && iconMap[icon]}
            {title && (<span className='button-title'>{title}</span>)}
        </span>
    )
}

export default ButtonAction