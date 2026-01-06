import { useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'

import { filterGetModelMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

import PropTypes from 'prop-types'

import './ModalList.scss'

const ModalList = ({ title, typeVisibility }) => {
    const { updateFilterModel } = useContext(ManageModelContext)
    const { modal: { loading: loadingGoal } } = useGoalProvider()
    const { modal: { loading: loadingAssigment } } = useAssignmentProvider()
    const { modal: { loading: loadingTag } } = useTagProvider()

    const typeRelation = typeVisibility === 'tag' ? typeVisibility : typeVisibility === 'goal' ? 'assignment' : 'goal'
    const typeSwitcherRelation = typeVisibility === 'tag' ? typeVisibility : typeVisibility === 'goal' ? 'goal-relation' : 'assignment-relation'
    const modelSwitcherProps = {
        display: {
            type: 'card-mini',
        },
    }

    useEffect(() => {
        const typeKey = typeRelation === 'tag' ? 'tagSomeID' : typeVisibility === 'goal' ? 'notGoalRelation' : 'goalSomeID'
        const filterGetModel = filterGetModelMap(
            { [typeKey]: 'all', type: typeRelation, source: 'support' },
            typeRelation,
            'support'
        )

        updateFilterModel(filterGetModel, typeRelation, 'modal')
    }, [typeRelation, typeVisibility])

    return (
        <div className={`container-list-modal ${typeVisibility}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction visibility={visibilityMap(`modal-list-${typeRelation}`, { remove: true })}
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

ModalList.propTypes = {
    title: PropTypes.string.isRequired,
    typeVisibility: PropTypes.string.isRequired
}

export default ModalList