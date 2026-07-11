import { useState } from 'react'

import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useVisibility } from '../../../../provider/ui/visibility-provider'
import { useManageModel } from '../../../../provider/model/manage-model-provider'

import { visibilityMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../button-action'
import Icons from '../../icons'

/** @typedef {import('../types.js').SearchItemTagProps} Props */

/**
 * @param {Props} props
 */
const SearchItemTag = ({ item, type, onButtonClick }) => {
    const { toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()
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
        <div 
            className={searchItemTagClass} 
            style={{ backgroundColor: `${item.color}` }}
            onClick={() => {
                setModel(prev => ({ ...prev, typeModel: 'tag' }))
                toggleVisibility(visibilityMap(['modal-right', 'tag']));
                setSwitchLayout(switchLayoutMap({
                    area: 'modal', layout: { modalName: 'modal-right', layoutName: 'tag' }
                }))
            }}
        >
            <div className='head'>
                <div className='item-info'>
                    <Icons icon={`icon-${type}`} />
                    <label>{item.name}</label>
                </div>
                {
                    (hasAssignmentRelation || hasGoalRelation) && (
                        <div className='item-action'>
                            <ButtonAction 
                                icon='icon-arrow-down' 
                                classBtn='circle small expand' 
                                onClick={() => setOpen((prev) => !prev)} key={item.id} 
                            />
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
                                        setSwitchLayout(switchLayoutMap({
                                            area: 'modal',
                                            layout: { modalName: 'modal-center', layoutName: 'form' }
                                        }))
                                    }}
                                >
                                    <Icons icon='icon-assignment' size='small' />
                                    <label>
                                        {assignment.name}
                                    </label>
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
                                        setSwitchLayout(switchLayoutMap({
                                            area: 'modal',
                                            layout: { modalName: 'modal-center', layoutName: 'form' }
                                        }))
                                    }}
                                >
                                    <Icons icon='icon-goal' size='small' />
                                    <label>
                                        {goal.name}
                                    </label>
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