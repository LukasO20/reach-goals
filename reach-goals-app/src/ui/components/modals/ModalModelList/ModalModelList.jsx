import { useEffect } from 'react'

import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'

import { filterBuildModelMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'
import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'

import './ModalModelList.scss'

export const ModalModelListMap = {
    title: '',
    type: '',
}

/**
 * @param {Object} ModalModelListMap
 * @param {string} ModalModelListMap.title
 * @param {string} ModalModelListMap.type
 */

const ModalModelList = ({ title, type } = ModalModelListMap) => {
    const { modal: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { modal: { data: dataAssignment = [], loading: loadingAssigment } } = useAssignmentProvider()
    const { modal: { data: dataTag = [], loading: loadingTag } } = useTagProvider()

    const currentData = type === 'goal' ? dataGoal : type === 'assignment' ? dataAssignment : dataTag

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

export default ModalModelList