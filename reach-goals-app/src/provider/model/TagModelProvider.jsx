import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as tagService from '../../services/tagService.js'

import { useTitle } from '../../provider/TitleProvider.jsx'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { validFilter } from '../../utils/utilsProvider.js'

export const TagModelContext = createContext()

export const TagModelProvider = ({ children, filters = {} }) => {
    const queryClient = useQueryClient()
    const { update } = useTitle()

    const queryKeyPage = ['tags', 'page', filters.page]
    const queryKeyModal = ['tags', 'modal', filters.modal]

    const createQueryFn = (scopeFilter) => {
        const valid = validFilter(scopeFilter)
        if (!valid) return () => Promise.resolve([])
        const [key, value] = valid;
        const fnName = filterServiceFnMap[key]
        return () => tagService[fnName](value)
    }

    const {
        data: pageData,
        error: pageError,
        isLoading: isPageLoading,
    } = useQuery({
        queryKey: queryKeyPage,
        queryFn: createQueryFn(filters.page),
        enabled: !!validFilter(filters.page),
    })

    const {
        data: modalData,
        error: modalError,
        isLoading: isModalLoading,
    } = useQuery({
        queryKey: queryKeyModal,
        queryFn: createQueryFn(filters.modal),
        enabled: !!validFilter(filters.modal),
    })

    const saveMutation = useMutation({
        mutationFn: (model) =>
            typeof model.id === 'number'
                ? tagService.updateTag(model)
                : tagService.addTag(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyModal })
            update({ toast: `Tag save with success` })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyModal })
            update({ toast: `Tag was deleted` })
        },
    })

    return (
        <TagModelContext.Provider value={{
            page: {
                data: pageData,
                error: pageError,
                loading: isPageLoading,
            },
            modal: {
                data: modalData,
                error: modalError,
                loading: isModalLoading,
            },
            save: saveMutation.mutate,
            saving: saveMutation.isPending,
            saveSuccess: saveMutation.isSuccess,
            remove: removeMutation.mutate,
            removeSuccess: removeMutation.isSuccess,
            removing: removeMutation.isPending,
            removingVariables: removeMutation.variables,
            resetSave: saveMutation.reset
        }}>
            {children}
        </TagModelContext.Provider>
    )
}

export const useTagProvider = () => useContext(TagModelContext)