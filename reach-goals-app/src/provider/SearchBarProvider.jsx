import { createContext, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

import * as searchBarService from '../services/common.js'

export const SearchBarContext = createContext()

export const SearchBarProvider = ({ children }) => {
    const searchMutation = useMutation({
        mutationFn: (param) => searchBarService.searchResults(param),
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