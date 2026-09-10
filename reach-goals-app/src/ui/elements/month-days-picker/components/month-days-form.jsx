import { useTitle } from '../../../../provider/ui/title-provider'
import { useDemoSession } from '../../../../provider/model/demo-session-provider'

import { cx } from '../../../../utils/utils'

import InputDate from '../../input-date'
import InputText from '../../input-text'
import ButtonAction from '../../button-action'
import Line from '../../line'
import Tooltip from '../../tooltip'

/** @typedef {import('../types.js').MonthDaysFormProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const MonthDaysForm = ({
    model,
    startDate,
    setModel,
    saveGoal,
    saveAssignment,
    pendingState,
    ...rest
}) => {
    const { update } = useTitle()
    const {
        visitor: { quotaModel },
    } = useDemoSession()

    const handleInputChange = (e) => {
        const { name, value } = e.target || e

        const update = {
            ...model.activeModel,
            [name]: value,
        }

        setModel((prevModel) => ({
            ...prevModel,
            activeModel: update,
        }))
    }

    const handleSubmit = () => {
        try {
            model.typeModel === 'goal' &&
                saveGoal(structuredClone(model.activeModel))
            model.typeModel === 'assignment' &&
                saveAssignment(structuredClone(model.activeModel))
        } catch (exception) {
            update({
                toast: 'Ops something went wrong during save. Reload page and try again later.',
            })
            console.error(`Error during save: ${exception.message}`)
        }
    }

    const buttonAssignmentClass = cx(
        `op-form-assignment
        plan
        ${model.typeModel === 'assignment' && 'active'}
        ${pendingState && 'disable'}
        `
    )

    const buttonGoalClass = cx(
        `op-form-goal
        plan
        ${model.typeModel === 'goal' && 'active'}
        ${pendingState && 'disable'}
        `
    )

    const hasSomeQuotaExceeded =
        (quotaModel.quotaExceeded.goal && model.typeModel === 'goal') ||
        (quotaModel.quotaExceeded.assignment &&
            model.typeModel === 'assignment')

    const tooltipMessage = hasSomeQuotaExceeded
        ? `Quota Exceeded to create some ${model.typeModel}`
        : ''

    const buttonCreateClass = cx(
        `plan 
        max-width 
        save
        ${hasSomeQuotaExceeded && 'disable'}
        `
    )

    const modelForm = model?.activeModel

    return (
        <div className='month-form' {...rest}>
            <div className='head'>
                <ButtonAction
                    classBtn={buttonAssignmentClass}
                    title='assignment'
                    nullForm={true}
                    onClick={() =>
                        setModel((prev) => ({
                            ...prev,
                            typeModel: 'assignment',
                            activeModel: { start: startDate },
                        }))
                    }
                />
                <ButtonAction
                    classBtn={buttonGoalClass}
                    title='goal'
                    nullForm={true}
                    onClick={() =>
                        setModel((prev) => ({
                            ...prev,
                            typeModel: 'goal',
                            activeModel: { start: startDate },
                        }))
                    }
                />
            </div>
            <Line />
            <div className='body'>
                <InputText
                    id={`${model.typeModel}-name`}
                    className='input-form input-text name'
                    placeholder={`${model.typeModel} name`}
                    name='name'
                    value={modelForm?.name || ''}
                    onChange={handleInputChange}
                />
                <InputDate
                    id='month-days-start-date'
                    className='input-form input-date start'
                    name='start'
                    selected={modelForm?.start || startDate}
                    onChange={handleInputChange}
                />
            </div>
            <Tooltip title={tooltipMessage}>
                <ButtonAction
                    pendingState={pendingState}
                    onClick={handleSubmit}
                    classBtn={buttonCreateClass}
                    icon='icon-save'
                    title='Create'
                />
            </Tooltip>
        </div>
    )
}

export default MonthDaysForm
