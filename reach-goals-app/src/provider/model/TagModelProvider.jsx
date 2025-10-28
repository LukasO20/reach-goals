import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as tagService from '../../services/tagService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const TagModelContext = createContext()

export const TagModelProvider = ({ children, filters = {} }) => {
    const queryClient = useQueryClient()

    const validFilter = Object.entries(filters).find(
        ([key, value]) =>
            (typeof value === 'number' || value === 'all') &&
            filterServiceFnMap[key]
    )

    const queryKey = ['tags', filters]

    const queryFn = () => {
        if (!validFilter) return Promise.resolve([])
        const [key, value] = validFilter
        const fnName = filterServiceFnMap[key]
        return tagService[fnName](value)
    }

    const {
        data,
        error,
        isLoading,
        refetch,
    } = useQuery({
        queryKey,
        queryFn,
        enabled: !!validFilter,
    })

    const saveMutation = useMutation({
        mutationFn: (model) =>
            typeof model.id === 'number'
                ? tagService.updateTag(model)
                : tagService.addTag(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    })

    return (
        <TagModelContext.Provider value={{
            data,
            error,
            loading: isLoading,
            refetch,
            save: saveMutation.mutate,
            remove: removeMutation.mutate,
            saving: saveMutation.isPending,
            saveSuccess: saveMutation.isSuccess,
            removing: removeMutation.isPending,
        }}>
            {children}
        </TagModelContext.Provider>
    )
}

export const useTagProvider = () => useContext(TagModelContext)