import { useContext, useEffect, useState, useMemo, useRef } from 'react'

import { iconMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils'
import { debounce } from '../../../../../utils/utils'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider'
import { useSearchBarProvider } from '../../../../../provider/SearchBarProvider'

import SearchBoxResults from './SearchBoxResults'
import PropTypes from 'prop-types'

import '../SearchBar/SearchBar.scss'
import ButtonAction from '../ButtonAction/ButtonAction'

const SearchBar = ({ mode = 'service', placeholder }) => {
    const [param, setParam] = useState('')
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { data, search, reset, isSearching, status } = useSearchBarProvider()

    const isShowSearchBoxResults = visibleElements.includes('search-bar') && mode === 'service'

    const handleSearchBarClick = (e) =>  {
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
                <input type='text' role='search' placeholder={placeholder || 'search'} id='search-content-m' className='search-content'
                    value={param} onChange={(e) => setParam(e.target.value)} />
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

SearchBar.propTypes = {
    mode: PropTypes.oneOf(['service', 'ui']),
    placeholder: PropTypes.string
}

export default SearchBar