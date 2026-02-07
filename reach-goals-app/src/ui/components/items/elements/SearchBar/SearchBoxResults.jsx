import { useContext } from 'react'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import PropTypes from 'prop-types'

import Loading from '../Loading/Loading.jsx'
import SearchItem from './elements/SearchItem.jsx'
import SearchItemTag from './elements/SearchItemTag.jsx'

import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'

const standardData = {
    goals: [],
    assignments: [],
    tags: []
}

const SearchBoxResults = ({ data, loading, status }) => {
    const { setModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { goals, assignments, tags } = data ?? standardData

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
                        (dataResult.map((item) => {
                            const type = item.type
                            const useSearchItem = type === 'assignment' || type === 'goal'
                            const useResourcesTag = type === 'tag'

                            return (
                                <>
                                    {
                                        useSearchItem && (
                                            <SearchItem key={item.id} type={type} item={item}
                                                onItemClick={handleItemClick}
                                                onButtonClick={handleEditModel}
                                            />
                                        )
                                    }
                                    {
                                        useResourcesTag && (
                                            <SearchItemTag key={item.id} type={type} item={item}
                                                onButtonClick={handleEditModel}
                                            />
                                        )
                                    }
                                </>
                            )
                        }))
            }
        </div>
    )
}

SearchBoxResults.propTypes = {
    data: PropTypes.shape({
        goals: PropTypes.array,
        assignments: PropTypes.array,
        tags: PropTypes.array
    }),
    loading: PropTypes.bool,
    status: PropTypes.string
}

export default SearchBoxResults