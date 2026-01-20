import { useContext } from 'react'
import { ManageModelContext } from '../../../../provider/ManageModelProvider'

import { iconMap, visibilityMap } from '../../../../utils/mapping/mappingUtils'

import ButtonAction from '../elements/ButtonAction/ButtonAction'

import PropTypes from 'prop-types'

const ModelRelationAdd = ({ type, children }) => {
    const { model } = useContext(ManageModelContext)
    const tittleRelation = type === 'goal' ? 'assignments' : 'goals'
    const visibilityRelation = {
        goal: 'assignment',
        assignment: 'goal',
        tag: 'tag'
    }

    const renderButtonAction = (currentType) => {
        switch (currentType) {
            case 'assignment':
                return (
                    <ButtonAction
                        unlinkGoal
                        classBtn='unlink-goal button-action plan-round add max-width small'
                        icon='cancel'
                        title='Unlink'
                    />
                )
            default:
                return (
                    <ButtonAction
                        visibility={visibilityMap(`modal-model-list-${visibilityRelation[currentType ?? type]}`, { add: true })}
                        classBtn={`modal-model-list-${currentType} button-action plan-round add max-width small`}
                        icon='plus'
                        title='Add'
                    />
                )
        }
    }

    if (type === 'assignment') {
        const goal = model.transportModel.goal
        const goaLinked = goal.length || null

        return (
            <div className={`item-forms goal ${goal.length ? 'selected' : ''}`}>
                <div className='head'>
                    <div className='item-head-1'>
                        <label>
                            {iconMap['goal']}{tittleRelation}
                            {
                                goaLinked &&
                                <>
                                    <span className='line' />
                                    <span className='name-goal'>{goal[0].name}</span>
                                </>
                            }
                        </label>
                        {renderButtonAction(!!goal.length ? 'assignment' : null)}
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
                        <label>{iconMap['assignment']}{tittleRelation}</label>
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

    if (type === 'tag') {
        return (
            <div className='item-forms tag'>
                <div className='head'>
                    <div className='item-head-1'>
                        <label>{iconMap['tag']}tags</label>
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

ModelRelationAdd.propTypes = {
    type: PropTypes.string,
    children: PropTypes.element.isRequired
}

export default ModelRelationAdd