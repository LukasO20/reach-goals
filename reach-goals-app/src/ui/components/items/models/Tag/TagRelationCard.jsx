import { useContext, useEffect, useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider'

import { iconMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'
import { updateDataModelMap } from '../../../../../utils/mapping/mappingUtilsProvider'

import ButtonAction from '../../elements/ButtonAction/ButtonAction'
import Goal from '../Goal/Goal'
import Assignment from '../Assignment/Assignment'

import './TagRelationCard.scss'

const standarOpenCard = [{ id: null, open: false }]

const TagRelationCard = () => {
    const [openCard, setOpenCard] = useState(standarOpenCard)
    const { model, setModel, updateDataModel } = useContext(ManageModelContext)
    const { modal: { data: dataPanel }, remove, removing, removeSuccess, removingVariables } = useTagProvider()
    const currentFilter = model.filter.tag.modal

    //First will be checked form source to render an goal, if not, will be render according goal filter
    const baseData =
        model.dataModel.tag.core.data ??
        dataPanel ??
        []

    useEffect(() => {
        const currentData = dataPanel

        if (currentFilter.source === 'core' && Array.isArray(currentData)) {
            const dataUpdateDataModel = updateDataModelMap({
                data: currentData,
                type: 'tag',
                scope: currentFilter.source
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [dataPanel, updateDataModel, currentFilter.source])

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
        baseData
            .filter(tag => !(removeSuccess && removingVariables && tag.id === removingVariables))
            .map(item => {
                const { goals = [], assignments = [] } = item
                const isOpen = openCard.some(card => card.id === item.id && card.open === true)
                const isRemoving = !!removing && removingVariables === item.id

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

                const displayModesProps = {
                    type: ['card-mini'],
                    actions: ['edit']
                }

                return (
                    <div className={`tag card-relation ${isOpen ? 'open' : ''} ${(hasGoal || hasAssignment) ? 'relationed' : ''} ${isRemoving ? 'pending' : ''}`} key={item.id} style={{ backgroundColor: `${colorTag}50`, borderColor: colorTag }}>
                        <div className='head' onClick={() => handleSetOpenCard(item)}>
                            <label>
                                {iconMap['tag']}
                                {item.name}
                            </label>
                            <div className='side-actions'>
                                {(hasGoal || hasAssignment) &&
                                    <ButtonAction classBtn='expand button-action circle small' icon='arrowdown'
                                        onClick={() => handleSetOpenCard(item)} />}
                                {<ButtonAction classBtn='edit button-action circle small' icon='edit'
                                    onClick={() => editTag(item.id)} visibility={visibilityMap('near-modalForm', { add: true })} />}
                                {<ButtonAction classBtn='delete button-action circle small' icon='remove'
                                    pendingState={isRemoving}
                                    onClick={() => deleteTag(item.id)} />}
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
                                    <Goal sourceForm={goal} display={displayModesProps} />
                                </div>
                            }
                            {
                                hasAssignment &&
                                <div className='content assignment'>
                                    <label className='message'>
                                        {iconMap['assignment']}
                                        {quantityAssigmentMessage}
                                    </label>
                                    <Assignment sourceForm={assignment} display={displayModesProps} />
                                </div>
                            }
                        </div>
                    </div>
                )
            })
    )
}

export default TagRelationCard