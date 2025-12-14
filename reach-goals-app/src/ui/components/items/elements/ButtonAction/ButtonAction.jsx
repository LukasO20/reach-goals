import { useContext } from 'react'

import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import Loading from '../Loading/Loading.jsx'

import '../ButtonAction/ButtonAction.scss'

const statusButton = (classBtn, providervisibleElements) => {
    if (!providervisibleElements) { return false }
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = (props) => {
    const { pendingState } = props
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent } = useSwitchLayout()
    const { model, resetManageModel, updateFormModel, removeFromTransportModel } = useContext(ManageModelContext)

    const classBtn = props.classBtn.split(' ')[2]
    const isOn = statusButton(classBtn, visibleElements)

    const handleClick = (e) => {
        e.stopPropagation()
        if (props.target) toggleVisibility(props.target, e)
        if (props.switchLayout) switchLayoutComponent(props.switchLayout)
        if (props.nullForm) resetManageModel(['formModel', 'mainModelID', 'transportModel'])
        if (props.unlinkGoal) { 
            updateFormModel({ keyObject: 'goalID', value: null, action: 'remove' }) 
            removeFromTransportModel({ id: model.formModel.goalID, type: 'goal' })
        }

        if (typeof props.onClick === 'function') {
            props.onClick({props, e}) // execute external function from 'onClick' external attribute    
        }
    }

    return (
        <span className={`${props.classBtn} ${isOn ? 'on' : ''} ${pendingState ? 'pending' : ''}`} datavalue={props.datavalue} 
            onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            {pendingState ? <Loading mode='inline' /> : props.icon && iconMap[props.icon]}
            <span className='button-title'>{props.title}</span>
        </span>
    )
}

export default ButtonAction