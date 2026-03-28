import { useEffect, useState, useMemo, useRef } from 'react'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils'
import { iconMap } from '../../../../../utils/mapping/mappingIcons'
import { debounce } from '../../../../../utils/utils'
import { useVisibility } from '../../../../../provider/VisibilityProvider'
import { useSearchBarProvider } from '../../../../../provider/SearchBarProvider'

import SearchBoxResults from './SearchBoxResults'
import ButtonAction from '../ButtonAction/ButtonAction'

import './SearchBar.scss'

export const SearchBarMap = {
    mode: 'service',
    placeholder: 'search'
}

/**
 * @param {Object} props
 * @param {'service' | 'ui'} [props.mode='service']
 * @param {string} [props.placeholder='search']
 */

const SearchBar = ({ mode = SearchBarMap.mode, placeholder = SearchBarMap.placeholder }) => {
    const [param, setParam] = useState('')
    const { visibleElements, toggleVisibility } = useVisibility()
    const { data, search, reset, isSearching, status } = useSearchBarProvider()

    const isShowSearchBoxResults = visibleElements.includes('search-bar') && mode === 'service'

    const handleSearchBarClick = (e) => {
        e.stopPropagation()
        toggleVisibility(visibilityMap('search-bar', isShowSearchBoxResults ? { maintain: true } : { add: true }))
    }

    const handleCleanSearchBar = () => { reset(); setParam('') }

    const debounceSearch = useMemo(() => debounce(search, 1000), [search])

    const lastParamRef = useRef('')

    useEffect(() => {
        const isValidParam = param.trim() && param.length > 1 && param !== lastParamRef.current && isShowSearchBoxResults
        if (isValidParam && mode === 'service') {
            debounceSearch(param)
            lastParamRef.current = param
        }
    }, [param, debounceSearch, isShowSearchBoxResults, mode])

    return (
        <div className='search-container'>
            <label className='search-bar' onClick={handleSearchBarClick}>
                {iconMap['search']}
                <input type='text' role='search' 
                    placeholder={placeholder || 'search'} id='search-content-m' 
                    className='search-content' value={param} onChange={(e) => setParam(e.target.value)} />
                {!!param && (
                    <ButtonAction
                        onClick={handleCleanSearchBar}
                        visibility={visibilityMap('search-bar', { remove: true })}
                        classBtn='clean-search button-action circle medium'
                        icon='cancel'
                    />
                )}
            </label>
            {isShowSearchBoxResults && (<SearchBoxResults data={data} loading={isSearching} status={status} />)}
        </div>
    )
}

export default SearchBar