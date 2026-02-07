import { useContext, useState } from 'react'

import { useSwitchLayout } from '../../../../../../provider/SwitchLayoutProvider.jsx'
import { VisibilityContext } from '../../../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../../../provider/ManageModelProvider.jsx'

import PropTypes from 'prop-types'

import { iconMap, visibilityMap, switchLayoutMap } from '../../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../ButtonAction/ButtonAction'

const SearchItemTag = ({ item, type, onButtonClick }) => {
    const { toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { setModel } = useContext(ManageModelContext)
    const [open, setOpen] = useState(false)

    const hasAssignmentRelation = !!item.assignments.length
    const hasGoalRelation = !!item.goals.length

    return (
        <div className={`item ${type} ${open ? 'open' : ''}`} style={{ backgroundColor: `${item.color}30` }}
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

SearchItemTag.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    onButtonClick: PropTypes.func
}

export default SearchItemTag