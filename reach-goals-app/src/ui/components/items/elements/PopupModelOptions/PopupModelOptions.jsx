import { useUtilityProvider } from '../../../../../provider/model/UtilityProvider'
import { useCheckbox } from '../../../../../provider/CheckboxProvider'

import ButtonAction from '../ButtonAction/ButtonAction'

import './PopupModelOptions.scss'

const formatCheckboxID = (ids = []) => {
    return ids.map((id) => {
        const formatID = Number(id.replace(/\D/g, ""))
        return formatID
    })
}

export const PopupModelOptionsMap = {
    type: ''
}

/**
 * @param {Object} PopupModelOptionsMap
 * @param {'tag' | 'goal' | 'assignment'} [PopupModelOptionsMap.type]
 */

const PopupModelOptions = ({ type } = PopupModelOptionsMap) => {
    const { saveStatus, savedStatusData, savingStatus, removeModels, removingModels } = useUtilityProvider()
    const { valuesCheckbox } = useCheckbox()

    const checkboxScope = valuesCheckbox.scope

    const onClickStatusModel = (status = '') => {
        if (!status) return null

        const selectedModel = formatCheckboxID(valuesCheckbox[checkboxScope]?.selected)
        saveStatus({ data: selectedModel, status })
    }

    const onClickRemoveModels = () => {
        const selectedModel = formatCheckboxID(valuesCheckbox[checkboxScope]?.selected)
        if (!selectedModel.length) return null

        removeModels({ data: selectedModel })
    }

    const isSavingStatusProgress = savedStatusData?.status === 'progress' && !!savingStatus
    const isSavingStatusConclude = savedStatusData?.status === 'conclude' && !!savingStatus
    const isSavingStatusCancel = savedStatusData?.status === 'cancel' && !!savingStatus
    const isDisable = isSavingStatusProgress || isSavingStatusConclude || isSavingStatusCancel

    return (
        <div className='container-popup model-options'>
            {type !== 'tag' && (
                <>
                    <ButtonAction classBtn='button-action progress plan-round' icon='progress' disable={isDisable && !isSavingStatusProgress}
                        title='in progress' onClick={() => onClickStatusModel('progress')} pendingState={isSavingStatusProgress} />
                    <ButtonAction classBtn='button-action conclude plan-round' icon='check' disable={isDisable && !isSavingStatusConclude}
                        title='conclude' onClick={() => onClickStatusModel('conclude')} pendingState={isSavingStatusConclude} />
                    <ButtonAction classBtn='button-action cancel plan-round' icon='cancel' disable={isDisable && !isSavingStatusCancel} 
                        title='cancel' onClick={() => onClickStatusModel('cancel')} pendingState={isSavingStatusCancel} />
                </>
            )}
            <ButtonAction classBtn='button-action delete plan-round' icon='remove' title='delete' 
                disable={isDisable && !removingModels} pendingState={!!removingModels} onClick={onClickRemoveModels} />
        </div>
    )
}

export default PopupModelOptions