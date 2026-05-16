import { createContext, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

import * as searchBarService from '../../../services/common.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').SearchBarContextValue} SearchBarContextValue */

/** @type {React.Context<SearchBarContextValue>} */
export const SearchBarContext = createContext()

export const SearchBarProvider = ({ children }) => {
    /** @type {import('./types.js').SearchBarSearchProps} */
    const searchMutation = useMutation({
        mutationFn: (query) => searchBarService.searchResults(query),
    })

    return (
        <SearchBarContext.Provider value={{
            data: searchMutation.data,
            isSearching: searchMutation.isPending,
            search: searchMutation.mutate,
            reset: searchMutation.reset,
            status: searchMutation.status
        }}>
            {children}
        </SearchBarContext.Provider>
    )
}

export const useSearchBarProvider = () => useContext(SearchBarContext)