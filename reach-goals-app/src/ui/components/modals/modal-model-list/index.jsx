import { useManageModel } from '../../../../provider/model/manage-model-provider.jsx'
import { useGoalProvider } from '../../../../provider/model/goal-model-provider.jsx'
import { useTagProvider } from '../../../../provider/model/tag-model-provider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider.jsx'

import { filterBuildModelMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../../items/elements/button-action' 
import Loading from '../../items/elements/loading' 
import ModelSwitcher from '../../items/models/model-switcher' 

import './style.scss'

/** @typedef {import('./types.js').ModalModelListProps} Props */

/**
 * @param {Props} props
 */
const ModalModelList = ({ title, type }) => {
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