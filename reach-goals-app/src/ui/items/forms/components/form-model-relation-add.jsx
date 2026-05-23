import { useManageModel } from '../../../../provider/model/manage-model-provider'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../utils/mapping/mappingIcons.jsx'

import { cx } from '../../../../utils/utils.js'

import moment from 'moment'

import ButtonAction from '../../elements/button-action' 
import Line from '../../elements/line'

/** @typedef {import('../types.js').ModelRelationAddProps} Props */

/**
 * @param {Props} props
 */
const FormModelRelationAdd = ({ type, children }) => {
    const { model } = useManageModel()
    const tittleRelation = type === 'goal' ? 'assignments' : 'goals'
    const visibilityRelation = { goal: 'assignment', assignment: 'goal', tag: 'tag' }

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
        const goals = model.selectedModel.goal 
        const goalData = goals[0] || model.activeModel?.goal
        const validGoal = !!goalData

        const modelRelationAddClass = cx(
            `item-forms
            goal
            ${validGoal && 'selected'}
            `
        )

        return (
            <div className={modelRelationAddClass}>
                <div className='head'>
                    <div className='item'>
                        <label>
                            {iconMap['goal']}{tittleRelation}
                            {validGoal &&
                                (<>
                                    <Line direction='vertical' />
                                    <span className='name-goal'>{goalData.name}</span>
                                </>)}
                        </label>
                        {renderButtonAction(validGoal ? 'assignment' : null)}
                    </div>
                    {!!validGoal && goalData.end && goalData.end !== 'Invalid date' && (
                        <div className='item'>
                            <span>schedule to end on {moment(goalData.end).format('MMMM DD')}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (type === 'goal') {
        return (
            <div className='item-forms assignment'>
                <div className='head'>
                    <div className='item'>
                        <label>{iconMap['assignment']}{tittleRelation}</label>
                        {renderButtonAction()}
                    </div>
                    <div className='item'></div>
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
                    <div className='item'>
                        <label>{iconMap['tag']}tags</label>
                        {renderButtonAction()}
                    </div>
                    <div className='item'></div>
                </div>
                <div className='body'>
                    {children}
                </div>
            </div>
        )
    }

    return null
}

export default FormModelRelationAdd