import { useContext } from 'react'
import { ManageModelContext } from '../../../../provider/ManageModelProvider'

import { iconMap, visibilityMap } from '../../../../utils/mapping/mappingUtils'

import ButtonAction from '../elements/ButtonAction/ButtonAction'

const ModelRelationAdd = (props) => {
    const { model } = useContext(ManageModelContext)
    const type = props.type
    const children = props.children
    const visibilityRelation = type === 'goal' ? 'assignment' : 'goal'
    const messageRelation = type === 'goal' ? 'assignments' : 'goals'

    const renderButtonAction = (type) => {
        return (
            typeof type === 'string' && type === 'assignment-relation' ?
                <ButtonAction unlinkGoal={true} classBtn={'unlink-goal button-action plan-round add max-width small'}
                    icon='cancel' title='Unlink' />
                :
                <ButtonAction visibility={visibilityMap(`modal-model-list-${visibilityRelation}`, { add: true })}
                    classBtn={`form-modal-model-list-${type} button-action plan-round add max-width small`}
                    icon='plus' title='Add' />
        )
    }

    if (type === 'assignment') {
        const goal = model.transportModel.goal
        const goaLinked = goal.length || null

        return (
            <div className={`item-forms goal ${goal.length ? 'selected' : ''}`}>
                <div className='head'>
                    <div className='item-head-1'>
                        <label>
                            {iconMap['goal']}{messageRelation}
                            {
                                goaLinked &&
                                <>
                                    <span className='line' />
                                    <span className='name-goal'>{goal[0].name}</span>
                                </>
                            }
                        </label>
                        {renderButtonAction(goal.length ? 'assignment-relation' : null)}
                    </div>
                    {
                        typeof goal[0]?.end === 'string' && goal[0]?.end !== 'Invalid date' && 
                        <div className='item-head-2'>
                            <span>schedule to end on {goal[0].end}</span>
                        </div>
                    }
                </div>
            </div>
        )
    }

    if (type === 'goal') {
        return (
            <div className='item-forms assignment'>
                <div className='head'>
                    <div className='item-head-1'>
                        <label>{iconMap['assignment']}{messageRelation}</label>
                        {renderButtonAction()}
                    </div>
                    <div className='item-head-2'></div>
                </div>
                <div className='body'>
                    {children}
                </div>
            </div>
        )
    }

    return null
}

export default ModelRelationAdd