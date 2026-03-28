import { useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider'
import { useManageModel } from '../../../../../provider/model/ManageModelProvider'

import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider'
import { buildCheckboxMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'
import { iconMap } from '../../../../../utils/mapping/mappingIcons'

import ButtonAction from '../../elements/ButtonAction/ButtonAction'
import ButtonCheckbox from '../../elements/ButtonCheckbox/ButtonCheckbox'
import Goal from '../Goal/Goal'
import Assignment from '../Assignment/Assignment'

import './TagRelationCard.scss'

const standarOpenCard = [{ id: null, open: false }]

export const TagRelationCardMap = {
    checkboxState: checkboxMap
}

const TagRelationCard = ({ checkboxState } = TagRelationCardMap) => {
    const [openCard, setOpenCard] = useState(standarOpenCard)
    const { setModel } = useManageModel()
    const { modal: { data = [] }, remove, removing, removeSuccess, removingVariables } = useTagProvider()

    const handleSetOpenCard = (item) => {
        setOpenCard(prev => {
            const exists = prev.some(card => card.id === item.id)
            if (exists) return prev.map(card => card.id === item.id ? { ...card, open: !card.open } : card)
            return [...prev, { id: item.id, open: true }]
        })
    }

    const editTag = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'tag' })) }
        catch (error) { console.error(`Failed to edit this goal: ${error}`) }
    }

    const deleteTag = async (id) => { remove(id) }

    return (
        data
            .filter(tag => !(removeSuccess && removingVariables && tag.id === removingVariables))
            .map(item => {
                const { goals = [], assignments = [] } = item

                const goal = {
                    goals: goals.filter(goalItem => !!goalItem?.goal).map(goalItem => {
                        return {
                            id: goalItem.id,
                            name: goalItem.goal.name,
                            status: goalItem.goal.status
                        }
                    })
                }
                const assignment = {
                    assignments: assignments.filter(assignmentItem => !!assignmentItem?.assignment).map(assignmentItem => {
                        return {
                            id: assignmentItem.id,
                            name: assignmentItem.assignment.name,
                            status: assignmentItem.assignment.status
                        }
                    })
                }

                const selectedCheckboxList = checkboxState.modal.selected
                const colorTag = item.color

                const quantityGoalMessage = goal.goals.length > 1 ? 
                    `${goal.goals.length} Goals` : `${goal.goals.length} Goal`
                const quantityAssigmentMessage = assignment.assignments.length > 1 ? 
                    `${assignment.assignments.length} Assignments` : `${assignment.assignments.length} Assignment`

                const displayModesProps = {
                    type: ['card-mini'],
                    actions: ['edit']
                }

                const hasGoal = !!goal.goals.length
                const hasAssignment = !!assignment.assignments.length
                const hasSomeRelation = hasGoal || hasAssignment ? 'relationed' : ''
                const isOpen = openCard.some(card => card.id === item.id && card.open === true) ? 'open' : ''
                const isRemoving = !!removing && removingVariables === item.id ? 'pending' : ''
                const isSelected = selectedCheckboxList.includes(`checkbox-${item.id}`) ? 'selected' : ''

                return (
                    <div className={`tag card-relation ${isOpen} ${hasSomeRelation} ${isRemoving} ${isSelected}`}
                        key={item.id}
                        style={{ backgroundColor: `${colorTag}50`, borderColor: colorTag }}>
                        <div className='head' onClick={() => handleSetOpenCard(item)}>
                            <label>
                                <ButtonCheckbox classBtn='checkbox-tag-card small' checkboxID={`checkbox-${item.id}`}
                                    checkbox={buildCheckboxMap({ checkboxID: `checkbox-${item.id}`, scope: 'modal' })} />
                                {iconMap['tag']}
                                {item.name}
                            </label>
                            <div className='side-actions'>
                                {(hasGoal || hasAssignment) &&
                                    <ButtonAction classBtn='expand button-action circle small' icon='arrowdown'
                                        onClick={() => handleSetOpenCard(item)} />}
                                <ButtonAction classBtn='edit button-action circle small' icon='edit'
                                    onClick={() => editTag(item.id)} visibility={visibilityMap('near-modalForm', { add: true })} />
                                <ButtonAction classBtn='delete button-action circle small' icon='remove'
                                    pendingState={isRemoving}
                                    onClick={() => deleteTag(item.id)} />
                            </div>
                        </div>
                        <div className='body'>
                            {
                                hasGoal &&
                                <div className='content goal'>
                                    <label className='message'>
                                        {iconMap['goal']}
                                        {quantityGoalMessage}
                                    </label>
                                    <Goal source={goal} display={displayModesProps} />
                                </div>
                            }
                            {
                                hasAssignment &&
                                <div className='content assignment'>
                                    <label className='message'>
                                        {iconMap['assignment']}
                                        {quantityAssigmentMessage}
                                    </label>
                                    <Assignment source={assignment} display={displayModesProps} />
                                </div>
                            }
                        </div>
                    </div>
                )
            })
    )
}

export default TagRelationCard