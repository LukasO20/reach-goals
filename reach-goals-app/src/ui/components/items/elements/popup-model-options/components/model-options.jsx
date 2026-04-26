import { useUtilityProvider } from "../../../../../../provider/model/utility-provider.jsx"
import { useCheckbox } from "../../../../../../provider/ui/checkbox-provider.jsx"

import ButtonAction from "../../button-action/index.jsx"


/** @typedef {import('../types.js').ModelOptionsProps} Props */

/**
 * @param {Props} props
 */
const ModelOptions = ({ type }) => {
    const { saveStatus, savedStatusData, savingStatus, removeModels, removingModels } = useUtilityProvider()
    const { valuesCheckbox } = useCheckbox()

    const checkboxScope = valuesCheckbox.scope

    const formatCheckboxID = (ids = []) => {
        return ids.map((id) => {
            const formatID = Number(id.replace(/\D/g, ""))
            return formatID
        })
    }

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
        <>
            {type !== 'tag' && (
                <>
                    <ButtonAction classBtn='progress plan-round' icon='progress' disable={isDisable && !isSavingStatusProgress}
                        title='in progress' onClick={() => onClickStatusModel('progress')} pendingState={isSavingStatusProgress} />
                    <ButtonAction classBtn='conclude plan-round' icon='check' disable={isDisable && !isSavingStatusConclude}
                        title='conclude' onClick={() => onClickStatusModel('conclude')} pendingState={isSavingStatusConclude} />
                    <ButtonAction classBtn='cancel plan-round' icon='cancel' disable={isDisable && !isSavingStatusCancel}
                        title='cancel' onClick={() => onClickStatusModel('cancel')} pendingState={isSavingStatusCancel} />
                </>
            )}
            <ButtonAction classBtn='button-action delete plan-round' icon='remove' title='delete'
                disable={isDisable && !removingModels} pendingState={!!removingModels} onClick={onClickRemoveModels} />
        </>
    )
}

export default ModelOptions