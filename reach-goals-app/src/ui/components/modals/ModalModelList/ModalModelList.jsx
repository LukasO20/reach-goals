import { useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'

import { filterGetModelMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'

import PropTypes from 'prop-types'

import './ModalModelList.scss'

const ModalModelList = ({ title, type, typeFilterKey }) => {
    const { updateFilterModel } = useContext(ManageModelContext)
    const { modal: { loading: loadingGoal } } = useGoalProvider()
    const { modal: { loading: loadingAssigment } } = useAssignmentProvider()
    const { modal: { loading: loadingTag } } = useTagProvider()

    useEffect(() => {
        const filterGetModel = filterGetModelMap(
            { [typeFilterKey]: 'all', type, source: 'support' },
            type,
            'support'
        )

        updateFilterModel(filterGetModel, type, 'modal')
    }, [type, typeFilterKey])

    const isLoading = !!loadingGoal || !!loadingAssigment || !!loadingTag

    return (
        <div className={`container-list-modal ${type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction visibility={visibilityMap(`modal-model-list-${type}`, { remove: true })}
                    classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                {isLoading ? <Loading mode='block' /> : <ModelSwitcher type={type} selectableModel={true} propsReference={{ display: { type: 'card-mini' }}} />}
            </div>
        </div>
    )
}

ModalModelList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    typeFilterKey: PropTypes.oneOf([
        'tagSomeID', 'notGoalRelation', 'goalSomeID'
    ]).isRequired
}

export default ModalModelList