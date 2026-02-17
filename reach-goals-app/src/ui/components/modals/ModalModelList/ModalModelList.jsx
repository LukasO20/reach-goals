import { useEffect } from 'react'

import { useManageModel } from '../../../../provider/ManageModelProvider.jsx'
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
    const { model, updateFilterModel } = useManageModel()
    const { modal: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { modal: { data: dataAssignment, loading: loadingAssigment } } = useAssignmentProvider()
    const { modal: { data: dataTag, loading: loadingTag } } = useTagProvider()

    const currentData = type === 'goal' ? dataGoal : type === 'assignment' ? dataAssignment : dataTag

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
    const propsReference = {
        display: displayModesProps,
        source: currentData
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
                {isLoading ? <Loading mode='block' /> : <ModelSwitcher type={type} selectableModel={true} propsReference={propsReference} />}
            </div>
        </div>
    )
}

ModalModelList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    typeFilterKey: PropTypes.oneOf([
        'tagSomeID', 'tagNotRelationGoal', 'tagNotRelationAssignment', 'notGoalRelation', 'goalSomeID'
    ]).isRequired
}

export default ModalModelList