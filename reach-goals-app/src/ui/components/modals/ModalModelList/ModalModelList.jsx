import { useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'

import { filterBuildModelMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'

import PropTypes from 'prop-types'

import './ModalModelList.scss'

const ModalModelList = ({ title, type, typeFilterKey }) => {
    const { model, updateFilterModel } = useContext(ManageModelContext)
    const { modal: { loading: loadingGoal } } = useGoalProvider()
    const { modal: { loading: loadingAssigment } } = useAssignmentProvider()
    const { modal: { loading: loadingTag } } = useTagProvider()

    useEffect(() => {
        const isModalModelListTag = typeof model.mainModelID === 'number' && (typeFilterKey === 'tagNotRelationGoal' || typeFilterKey === 'tagNotRelationAssignment')
        const typeFilterKeyValue = isModalModelListTag ? model.mainModelID : 'all'

        const filterGetModel = filterBuildModelMap(
            { [typeFilterKey]: typeFilterKeyValue, type, source: 'support' },
            type,
            'support'
        )
        const dataFilter = updateFilterModelMap({ filter: filterGetModel, model: type, scope: 'modal' })
        updateFilterModel(dataFilter)
    }, [type, typeFilterKey, updateFilterModel, model.mainModelID])

    const displayModesProps = {
        type: ['card-mini'],
        actions: []
    }

    const isLoading = !!loadingGoal || !!loadingAssigment || !!loadingTag

    return (
        <div className={`container-list-modal ${type}`} onClick={(e) => e.stopPropagation()}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction visibility={visibilityMap(`modal-model-list-${type}`, { remove: true })}
                    classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                {isLoading ? <Loading mode='block' /> : <ModelSwitcher type={type} selectableModel={true} propsReference={{ display: displayModesProps }} />}
            </div>
        </div>
    )
}

ModalModelList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    typeFilterKey: PropTypes.oneOf([
        'tagNotRelationGoal', 'tagNotRelationAssignment', 'notGoalRelation', 'goalSomeID'
    ]).isRequired
}

export default ModalModelList