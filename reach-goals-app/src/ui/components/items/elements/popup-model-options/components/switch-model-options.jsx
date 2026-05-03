import { useSwitchLayout } from '../../../../../../provider/ui/switch-layout-provider.jsx'

import { cx } from '../../../../../../utils/utils.js'

import ButtonAction from '../../button-action/index.jsx'

/** @typedef {import('../types.js').SwitchModelOptionsProps} Props */

/**
 * @param {Props} props
 */
const SwitchModelOptions = ({ type, onFilterTabs }) => {
    const { data: { visibility }, setUserConfigLayout } = useSwitchLayout()

    const allowLayout = {
        home: 'layoutHome',
        calendar: 'layoutCalendar',
        objectives: 'layoutObjectives'
    }

    const dynamicKey = `${allowLayout[type]}`

    /** * @param {{ layout: import('../../../../../../utils/types.js').LayoutType }} props */
    const handleButtonActionClick = ({ layout }) => {
        setUserConfigLayout({ type: 'visibility', data: { [dynamicKey]: layout } })
        onFilterTabs?.(null)
    }

    /** @param {import('../../../../../../utils/types.js').LayoutType} type */
    const isSwitchLayout = (type) => visibility[dynamicKey] === type

    const buttonSwitchColumnGoalClass = cx(`switch-chart pie max-width plan-round ${isSwitchLayout('goal') && 'active'}`)
    const buttonSwitchColumnAssignmentClass = cx(`switch-chart bar max-width plan-round ${isSwitchLayout('assignment') && 'active'}`)
    const buttonSwitchAllActivitiesClass = cx(`switch-chart all-activities max-width plan-round ${isSwitchLayout('all-activities') && 'active'}`)

    return (
        <>
            <ButtonAction
                classBtn={buttonSwitchColumnGoalClass}
                icon='goal'
                title='goal'
                onClick={() => handleButtonActionClick({ layout: 'goal' })}
            />
            <ButtonAction
                classBtn={buttonSwitchColumnAssignmentClass}
                icon='assignment'
                title='assignment'
                onClick={() => handleButtonActionClick({ layout: 'assignment' })}
            />
            {(type === 'calendar' || type === 'objectives') && (
                <ButtonAction
                    classBtn={buttonSwitchAllActivitiesClass}
                    title='all activities'
                    onClick={() => handleButtonActionClick({ layout: 'all-activities' })}
                />
            )}
        </>
    )
}

export default SwitchModelOptions