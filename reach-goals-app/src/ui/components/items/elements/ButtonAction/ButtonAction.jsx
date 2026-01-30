import { useContext } from 'react'

import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { resetManageModelMap, updateFormModelMap, removeFromTransportModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Loading from '../Loading/Loading.jsx'

import PropTypes from 'prop-types'

import '../ButtonAction/ButtonAction.scss'

const statusButton = (classBtn, providervisibleElements) => {
    if (!providervisibleElements) { return false }
    return providervisibleElements.includes(classBtn)
}

const ButtonAction = ({ visibility, switchLayout, nullForm, unlinkGoal, onClick, pendingState, datavalue, icon, title, classBtn }) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { model, resetManageModel, updateFormModel, removeFromTransportModel } = useContext(ManageModelContext)

    const classBtnAction = classBtn.split(' ')[2]
    const isOn = statusButton(classBtnAction, visibleElements)

    const handleClick = (e) => {
        e.stopPropagation()

        const dataResetManageModel = resetManageModelMap(['formModel', 'mainModelID', 'transportModel'])
        const dataUpdateFormModel = updateFormModelMap({ keyObject: 'goalID', value: null, action: 'remove' })
        const dataRemoveFromTransportModel = removeFromTransportModelMap({ id: model.formModel.goalID, type:  'goal' })

        if (visibility) toggleVisibility(visibility, e)
        if (switchLayout) updateSwitchLayout(switchLayout)
        if (nullForm) resetManageModel(dataResetManageModel)
        if (unlinkGoal) {
            updateFormModel(dataUpdateFormModel)
            removeFromTransportModel(dataRemoveFromTransportModel)
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

    return (
        <span className={`${classBtn} ${isOn ? 'on' : ''} ${pendingState ? 'pending' : ''}`} datavalue={datavalue}
            onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''} role='button' tabIndex='0'>
            {pendingState ? <Loading mode='inline' /> : icon && iconMap[icon]}
            <span className='button-title'>{title}</span>
        </span>
    )
}

ButtonAction.propTypes = {
    target: PropTypes.shape({
        class: PropTypes.array.isRequired,
        operator: PropTypes.object.isRequired
    }),
    switchLayout: PropTypes.shape({
        area: PropTypes.string.isRequired,
        state: PropTypes.oneOfType([
            PropTypes.shape({
                modalName: PropTypes.string.isRequired,
                layoutName: PropTypes.string.isRequired
            }),
            PropTypes.shape({
                pageName: PropTypes.string.isRequired,
                layoutName: PropTypes.string.isRequired
            })
        ])
    }),
    nullForm: PropTypes.bool,
    unlinkGoal: PropTypes.bool,
    onClick: PropTypes.func,
    pendingState: PropTypes.bool,
    icon: PropTypes.string,
    title: PropTypes.string,
    classBtn: PropTypes.string.isRequired
}

export default ButtonAction