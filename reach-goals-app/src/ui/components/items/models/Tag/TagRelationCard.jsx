import { useState } from 'react'

import { iconMap } from '../../../../../utils/mapping/mappingUtils'

import ButtonAction from '../../elements/ButtonAction/ButtonAction'
import Goal from '../Goal/Goal'
import Assignment from '../Assignment/Assignment'

import PropTypes from 'prop-types'

import './TagRelationCard.scss'

const standarOpenCard = [{ id: null, open: false }]

const TagRelationCard = ({ tagRelation }) => {
    const [openCard, setOpenCard] = useState(standarOpenCard)

    const handleSetOpenCard = (item) => {
        setOpenCard(prev => {
            const exists = prev.some(card => card.id === item.id)
            if (exists) return prev.map(card => card.id === item.id ? { ...card, open: !card.open } : card)
            return [...prev, { id: item.id, open: true }]
        })
    }

    return (
        tagRelation.map(item => {
            const { goals = [], assignments = [] } = item
            const isOpen = openCard.some(card => card.id === item.id && card.open === true)

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

            const hasGoal = !!goal.goals.length
            const hasAssignment = !!assignment.assignments.length
            const colorTag = item.color

            const quantityGoalMessage = goal.goals.length > 1 ? `${goal.goals.length} Goals` : `${goal.goals.length} Goal`
            const quantityAssigmentMessage = assignment.assignments.length > 1 ? `${assignment.assignments.length} Assignments` : `${assignment.assignments.length} Assignment`

            return (
                <div className={`tag card-relation ${(hasGoal || hasAssignment) ? 'relationed' : ''} ${isOpen ? 'open' : ''}`} key={item.id} style={{ backgroundColor: `${colorTag}50`, borderColor: colorTag }}>
                    <div className='head' onClick={() => handleSetOpenCard(item)}>
                        <label>
                            {iconMap['tag']}
                            {item.name}
                        </label>
                        {
                            (hasGoal || hasAssignment) &&
                            <ButtonAction classBtn='expand button-action circle small' icon='arrowdown' onClick={() => handleSetOpenCard(item)} />
                        }
                    </div>
                    <div className='body'>
                        {
                            hasGoal &&
                            <div className='content goal'>
                                <label className='message'>
                                    {iconMap['goal']}
                                    {quantityGoalMessage}
                                </label>
                                <Goal sourceForm={goal} display={{ type: 'card-mini' }} />
                            </div>
                        }
                        {
                            hasAssignment &&
                            <div className='content assignment'>
                                <label className='message'>
                                    {iconMap['assignment']}
                                    {quantityAssigmentMessage}
                                </label>
                                <Assignment sourceForm={assignment} display={{ type: 'card-mini' }} />
                            </div>
                        }
                    </div>
                </div>
            )
        })
    )
}

TagRelationCard.propTypes = {
    tagRelation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        assignments: PropTypes.shape({
            assignment: PropTypes.shape({
                name: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired
            }),
        }),
        goals: PropTypes.shape({
            goal: PropTypes.shape({
                name: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired
            }),
        })
    })
}

export default TagRelationCard