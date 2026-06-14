import { useEffect, useState, useMemo, useRef } from 'react'
import { useVisibility } from '../../../../provider/ui/visibility-provider'
import { useSearchBarProvider } from '../../../../provider/ui/searchbar-provider'
import { useOutsideClick } from '../../../../hooks/useOutsideClick.js'

import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'
import { cx, debounce } from '../../../../utils/utils.js'

import SearchBoxResults from './searchbox-results.jsx'
import ButtonAction from '../button-action'
import Tooltip from '../tooltip'
import Icons from '../icons'

import './style.scss'

/** @typedef {import('./types.js').SearchProps} Props */

/**
 * @param {Props} props
 */
const SearchBar = ({ mode = 'service', placeholder = 'search', tooltip = 'Search' }) => {
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
    const searchBoxRef = useRef(null)
    const searchbarClass = cx(
        `search-container
        ${isShowSearchBoxResults && 'active'}
        `
    )

    useOutsideClick(searchBoxRef, () => {
        if (isShowSearchBoxResults) toggleVisibility(visibilityMap('search-bar'))
    })

    useEffect(() => {
        const isValidParam = param.trim() && param.length > 1 && param !== lastParamRef.current && isShowSearchBoxResults
        if (isValidParam && mode === 'service') {
            debounceSearch(param)
            lastParamRef.current = param
        }
    }, [param, debounceSearch, isShowSearchBoxResults, mode])

    return (
        <div className={searchbarClass} ref={searchBoxRef}>
            <label className='search-bar' onClick={handleSearchBarClick}>
                <Tooltip title={tooltip}>
                    <Icons icon='icon-search' />
                </Tooltip>
                <input type='text' role='search'
                    placeholder={placeholder || 'search'} id='search-content-m'
                    className='search-content' value={param} onChange={(e) => setParam(e.target.value)} />
                {!!param && isShowSearchBoxResults && (
                    <Tooltip title='Clear search'>
                        <ButtonAction
                            onClick={handleCleanSearchBar}
                            visibility={visibilityMap('search-bar', { remove: true })}
                            classBtn='clean-search circle medium'
                            icon='icon-cancel'
                        />
                    </Tooltip>
                )}
            </label>
            {isShowSearchBoxResults && (<SearchBoxResults data={data} loading={isSearching} status={status} />)}
        </div>
    )
}

export default SearchBar