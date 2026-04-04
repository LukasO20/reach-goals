import { ModelQueryClientProvider } from '../../../../provider/model/ModelQueryClientProvider' 

import { useManageModel } from '../../../../provider/model/ManageModelProvider'

import { buildFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider'

import ModalModelList from './ModalModelList'

export const ModalModelListWrapperMap = {
    title: '',
    type: '',
    typeFilterKey: ''
}

/**
 * @param {Object} ModalModelListWrapperMap
 * @param {string} ModalModelListWrapperMap.title
 * @param {string} ModalModelListWrapperMap.type
 * @param {'tagSomeID'|'tagNotRelationGoal'|'tagNotRelationAssignment'|'notGoalRelation'|'goalSomeID'} ModalModelListWrapperMap.typeFilterKey
 */

export const ModalModelListWrapper = ({ title, type, typeFilterKey } = ModalModelListWrapperMap) => {
    const { model } = useManageModel()
    const dataFilter = buildFilterModelMap(type, typeFilterKey, 'modal', model.mainModelID ?? 'all')
        
    return (
        <ModelQueryClientProvider filter={dataFilter}>
            <ModalModelList title={title} type={type} />
        </ModelQueryClientProvider>
    )
}