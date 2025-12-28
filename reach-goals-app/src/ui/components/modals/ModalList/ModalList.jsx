import { useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'

import { filterGetModelMap, targetMap } from '../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../utils/utils.js'

import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

import './ModalList.scss'

const ModalList = (props) => {
    const { type, title } = props
    const { updateFilterModel } = useContext(ManageModelContext)
    const { panel: { loading: loadingGoal } } = useGoalProvider()
    const { panel: { loading: loadingAssigment } } = useAssignmentProvider()
    const { panel: { loading: loadingTag } } = useTagProvider()

    const typeRelation = type === 'tag' ? type : type === 'goal' ? 'assignment' : 'goal'
    const typeSwitcherRelation = type === 'tag' ? type : type === 'goal' ? 'goal-relation' : 'assignment-relation'
    const modelSwitcherProps = {
        display: {
            type: 'card-mini',
        },
    }

    useEffect(() => {
        const typeKey = typeRelation === 'tag' ? 'tagSomeID' : type === 'goal' ? 'notGoalRelation' : 'goalSomeID'
        if (type) {
            const filterGetModel = filterGetModelMap(
                { [typeKey]: 'all', type: typeRelation, source: 'support' },
                typeRelation,
                'support'
            )

            updateFilterModel(filterGetModel, typeRelation, 'panel')
        }
    }, [])

    const requiredSuccessful = hasRequiredProps(props, ['type', 'title'])
    if (!requiredSuccessful) return null

    return (
        <div className={`container-list-modal ${type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction target={targetMap(`modal-list-${typeRelation}`, { remove: true })}
                    classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                {
                    (loadingGoal || loadingAssigment || loadingTag) ?
                        <Loading />
                        :
                        <ModelSwitcher type={typeSwitcherRelation} selectableModel={true} propsReference={modelSwitcherProps} />}
            </div>
        </div>
    )
}

export default ModalList