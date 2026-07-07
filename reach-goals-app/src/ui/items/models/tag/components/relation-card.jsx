import { useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/tag-model-provider'
import { useManageModel } from '../../../../../provider/model/manage-model-provider'

import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider'
import { buildCheckboxMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'

import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../../../elements/button-action'
import ButtonCheckbox from '../../../elements/button-checkbox'
import Goal from '../../goal'
import Assignment from '../../assignment'
import Icons from '../../../elements/icons'

import '../style.scss'

const standarOpenCard = [{ id: null, open: false }]

/** @typedef {import('../types.js').RelationCardProps} Props */

/**
 * @param {Props} props
 */
const RelationCard = ({ checkboxState = checkboxMap, data = [] }) => {
    const [openCard, setOpenCard] = useState(standarOpenCard)
    const { setModel } = useManageModel()
    const { remove, removing, removeSuccess, removingVariables } = useTagProvider()

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
                    goals: goals.filter(goalItem => goalItem.goal).map(goalItem => {
                        return {
                            id: goalItem.id,
                            name: goalItem.goal.name,
                            status: goalItem.goal.status
                        }
                    })
                }
                const assignment = {
                    assignments: assignments.filter(assignmentItem => assignmentItem.assignment).map(assignmentItem => {
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
                const hasSomeRelation = hasGoal || hasAssignment
                const isOpen = openCard.some(card => card.id === item.id && card.open === true) ? 'open' : ''
                const isRemoving = !!removing && removingVariables === item.id ? 'pending' : ''
                const isSelected = selectedCheckboxList.includes(`checkbox-${item.id}`) ? 'selected' : ''

                const tagCardRelationClass = cx(
                    `tag 
                    card-relation
                    ${isOpen} 
                    ${hasSomeRelation && 'relationed'} 
                    ${isRemoving} 
                    ${isSelected}
                    `
                )

                return (
                    <div className={tagCardRelationClass}
                        key={item.id}
                        style={{ backgroundColor: `${colorTag}` }}>
                        <div
                            className='head'
                            onClick={() => hasSomeRelation ? handleSetOpenCard(item) : {}}
                        >
                            <label>
                                <ButtonCheckbox
                                    classBtn='checkbox-tag-card small'
                                    checkboxID={`checkbox-${item.id}`}
                                    checkbox={buildCheckboxMap({ checkboxID: `checkbox-${item.id}`, scope: 'modal' })}
                                />
                                <Icons icon='icon-tag' />
                                <label className='title'>{item.name}</label>
                            </label>
                            <div className='side-actions'>
                                {hasSomeRelation &&
                                    <ButtonAction
                                        classBtn='expand circle small'
                                        icon='icon-arrow-down'
                                        onClick={() => handleSetOpenCard(item)}
                                    />}
                                <ButtonAction
                                    classBtn='edit circle small'
                                    icon='icon-edit'
                                    onClick={() => editTag(item.id)}
                                    visibility={visibilityMap('near-modalForm', { add: true })}
                                />
                                <ButtonAction
                                    classBtn='delete circle small'
                                    icon='icon-trash'
                                    pendingState={isRemoving}
                                    onClick={() => deleteTag(item.id)}
                                />
                            </div>
                        </div>
                        <div className='body'>
                            {
                                hasGoal &&
                                <div className='content goal'>
                                    <label className='message'>
                                        <Icons icon='icon-goal' />
                                        <label>
                                            {quantityGoalMessage}
                                        </label>
                                    </label>
                                    <Goal source={goal} display={displayModesProps} />
                                </div>
                            }
                            {
                                hasAssignment &&
                                <div className='content assignment'>
                                    <label className='message'>
                                        <Icons icon='icon-assignment' />
                                        <label>
                                            {quantityAssigmentMessage}
                                        </label>
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

export default RelationCard