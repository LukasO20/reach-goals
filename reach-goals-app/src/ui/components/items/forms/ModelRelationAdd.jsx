import React from 'react'
import { useManageModel } from '../../../../provider/model/ManageModelProvider'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils'
import { iconMap } from '../../../../utils/mapping/mappingIcons'

import { cx } from '../../../../utils/utils'

import ButtonAction from '../elements/ButtonAction/ButtonAction'

export const ModelRelationAddMap = {
    type: '',
    children: null
}

/**
 * @param {Object} FormTagMap
 * @param {React.ReactNode} FormTagMap.children
 * @param {string} FormTagMap.type
 */

const ModelRelationAdd = ({ type, children } = ModelRelationAddMap) => {
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
        const goaLinked = goals.length || null
        const goalData = goals[0]

        const modelRelationAddClass = cx(
            `item-forms
            goal
            ${!!goals.length && 'selected'}
            `
        )

        return (
            <div className={modelRelationAddClass}>
                <div className='head'>
                    <div className='item-head-1'>
                        <label>
                            {iconMap['goal']}{tittleRelation}
                            {goaLinked &&
                                (<>
                                    <span className='line' />
                                    <span className='name-goal'>{goalData.name}</span>
                                </>)}
                        </label>
                        {renderButtonAction(!!goals.length ? 'assignment' : null)}
                    </div>
                    {!!goalData && goalData.end && goalData.end !== 'Invalid date' && (
                        <div className='item-head-2'>
                            <span>schedule to end on {goalData.end}</span>
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

export default ModelRelationAdd