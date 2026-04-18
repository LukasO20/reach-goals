import { useState } from 'react'

import { useSwitchLayout } from '../../../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useVisibility } from '../../../../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../../../../provider/model/ManageModelProvider.jsx'

import { visibilityMap, switchLayoutMap } from '../../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../../utils/mapping/mappingIcons.jsx'

import { cx } from '../../../../../../utils/utils.js'

import ButtonAction from '../../button-action'

/** @typedef {import('../types.js').SearchItemTagProps} Props */

/**
 * @param {Props} props
 */
const SearchItemTag = ({ item, type, onButtonClick }) => {
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { setModel } = useManageModel()
    const [open, setOpen] = useState(false)

    const hasAssignmentRelation = !!item.assignments.length
    const hasGoalRelation = !!item.goals.length

    const searchItemTagClass = cx(
        `item
        ${type}
        ${open && 'open'}
        `
    )

    return (
        <div className={searchItemTagClass} style={{ backgroundColor: `${item.color}30` }}
            onClick={() => {
                setModel(prev => ({ ...prev, typeModel: 'tag' }))
                toggleVisibility(visibilityMap(['modal-right', 'tag']));
                updateSwitchLayout(switchLayoutMap({
                    area: 'modal', state: { modalName: 'modal-right', layoutName: 'tag' }
                }))
            }}
        >
            <div className='head'>
                <div className='item-info'>
                    {iconMap[type]}
                    <label>{item.name}</label>
                </div>
                {
                    (hasAssignmentRelation || hasGoalRelation) && (
                        <div className='item-action'>
                            <ButtonAction icon='arrowdown' classBtn='button-action circle small expand' onClick={() => setOpen((prev) => !prev)} key={item.id} />
                        </div>
                    )
                }
            </div>
            <div className='body'>
                <div className='item-content scrollable'>
                    {
                        hasAssignmentRelation && (
                            item.assignments.map(({ assignment, assignmentID }) =>
                                <label className='item-tag' key={assignmentID}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onButtonClick(assignmentID, 'assignment');
                                        toggleVisibility(visibilityMap(['modal-center', 'assignment']));
                                        updateSwitchLayout(switchLayoutMap({
                                            area: 'modal',
                                            state: { modalName: 'modal-center', layoutName: 'form' }
                                        }))
                                    }}
                                >
                                    {iconMap['assignment']}{assignment.name}
                                </label>
                            )
                        )
                    }
                    {
                        hasGoalRelation && (
                            item.goals.map(({ goal, goalID }) =>
                                <label className='item-tag' key={goalID}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onButtonClick(goalID, 'goal');
                                        toggleVisibility(visibilityMap(['modal-center', 'goal']));
                                        updateSwitchLayout(switchLayoutMap({
                                            area: 'modal',
                                            state: { modalName: 'modal-center', layoutName: 'form' }
                                        }))
                                    }}
                                >
                                    {iconMap['goal']}{goal.name}
                                </label>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchItemTag