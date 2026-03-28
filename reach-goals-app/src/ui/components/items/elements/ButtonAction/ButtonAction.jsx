import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../../../provider/model/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/ui/SwitchLayoutProvider'

import { cx } from '../../../../../utils/utils'
import { iconMap } from '../../../../../utils/mapping/mappingIcons'
import { resetManageModelMap, updateFormModelMap, removeFromSelectedModelMap } from '../../../../../utils/mapping/mappingUtilsProvider'

import Loading from '../Loading/Loading.jsx'

import '../ButtonAction/ButtonAction.scss'

export const ButtonActionMap = {
    target: {},
    switchLayout: {},
    nullForm: false,
    unlinkGoal: false,
    pendingState: false,
    disable: false,
    onClick: () => { },
    icon: '',
    title: '',
    classBtn: ''
}

/**
 * @param {Object} props
 * @param {Object} [props.target]
 * @param {Object} [props.switchLayout]
 * @param {boolean} [props.nullForm]
 * @param {boolean} [props.unlinkGoal]
 * @param {boolean} [props.pendingState]
 * @param {boolean} [props.disable]
 * @param {function} [props.onClick]
 * @param {string} [props.icon]
 * @param {string} [props.title]
 * @param {string} [props.classBtn]
 */

const statusButton = (classBtn, providervisibleElements = []) => {
    if (!providervisibleElements) { return false }
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = ({ 
    visibility, 
    switchLayout, 
    nullForm, 
    unlinkGoal, 
    onClick, 
    pendingState, 
    disable, 
    datavalue, 
    icon, 
    title, 
    classBtn 
} = ButtonActionMap) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { model, resetManageModel, updateFormModel, removeFromSelectedModel } = useManageModel()

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
                datavalue,
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
        <span className={buttonActionClass} datavalue={datavalue}
            onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            {pendingState ? <Loading mode='inline' /> : icon && iconMap[icon]}
            <span className='button-title'>{title}</span>
        </span>
    )
}

export default ButtonAction