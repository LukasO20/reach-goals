import React from 'react'
import { useManageModel } from '../../../../../provider/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import Loading from '../Loading/Loading.jsx'
import SearchItem from './elements/SearchItem.jsx'
import SearchItemTag from './elements/SearchItemTag.jsx'

import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'

export const SearchBoxResultsMap = {
    data: {
        goals: [],
        assignments: [],
        tags: []
    },
    loading: false,
    status: ''
}

/**
 * @param {Object} SearchBoxResultsMap
 * @param {Object} SearchBoxResultsMap.data
 * @param {Array} SearchBoxResultsMap.data.goals
 * @param {Array} SearchBoxResultsMap.data.assignments
 * @param {Array} SearchBoxResultsMap.data.tags
 * @param {boolean} SearchBoxResultsMap.loading
 * @param {string} SearchBoxResultsMap.status
 */

const SearchBoxResults = ({ data, loading, status } = SearchBoxResultsMap) => {
    const { setModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()
    const { goals, assignments, tags } = data

    const dataResult = [
        ...goals.map((g) => ({ ...g, type: 'goal' })),
        ...assignments.map((a) => ({ ...a, type: 'assignment' })),
        ...tags.map((t) => ({ ...t, type: 'tag' }))
    ]

    const handleEditModel = (id, type = '') => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: type })) }
        catch (error) { console.error(`Failed to edit this ${type}: ${error}`) }
    }

    const handleItemClick = (id, type = '', model = {}) => {
        const dataSwitchLayout = switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } })
        setModel(prev => ({ ...prev, mainModelID: id, formModel: model, typeModel: type }))
        updateSwitchLayout(dataSwitchLayout)
        toggleVisibility(visibilityMap(['modal-right', type]))
    }

    const showMessage = !dataResult.length
    const message = status === 'idle' ? 'Start some search. Ex: a goal name.' : 'No results found.'

    return (
        <div className='search-box scrollable' onClick={(e) => e.stopPropagation()}>
            {
                loading ? (<Loading mode='inline' title='searching results' />) :
                    showMessage ?
                        (<div className='item'>
                            <div className='item-info'>
                                <label className='message'>{message}</label>
                            </div>
                        </div>) :
                        (dataResult.map((item, i) => {
                            const type = item.type
                            const useSearchItem = type === 'assignment' || type === 'goal'
                            const useResourcesTag = type === 'tag'

                            return (
                                <React.Fragment key={item.id}>
                                    {
                                        useSearchItem && (
                                            <SearchItem type={type} item={item}
                                                onItemClick={handleItemClick}
                                                onButtonClick={handleEditModel}
                                            />
                                        )
                                    }
                                    {
                                        useResourcesTag && (
                                            <SearchItemTag type={type} item={item}
                                                onButtonClick={handleEditModel}
                                            />
                                        )
                                    }
                                </React.Fragment>
                            )
                        }))
            }
        </div>
    )
}

export default SearchBoxResults