import { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as tagService from '../../../services/tagService.js'

import { useManageModel } from '../manage-model-provider'
import { useTitle } from '../../ui/title-provider'

import { updateDataModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'
import { createQueryFn, validFilter } from '../../../utils/utilsProvider.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').TagModelContextValue} TagModelContextValue */

/** @type {React.Context<TagModelContextValue>} */
export const TagModelContext = createContext()

export const TagModelProvider = ({ children }) => {
    const { model: { filter: filterModel }, updateDataModel } = useManageModel()
    const { update } = useTitle()

    const queryClient = useQueryClient()

    const filterPage = filterModel.tag.page
    const filterModal = filterModel.tag.modal

    const queryKeyPage = ['tags', 'page', filterPage]
    const queryKeyModal = ['tags', 'modal', filterModal]

    const {
        data: pageData,
        error: pageError,
        isLoading: isPageLoading,
    } = useQuery({
        queryKey: queryKeyPage,
        queryFn: createQueryFn(filterPage, tagService),
        enabled: validFilter(filterPage, 'some'),
        staleTime: 1000 * 60 * 5 //5 minutes for new data
    })

    const {
        data: modalData,
        error: modalError,
        isLoading: isModalLoading,
    } = useQuery({
        queryKey: queryKeyModal,
        queryFn: createQueryFn(filterModal, tagService),
        enabled: validFilter(filterModal, 'some'),
        staleTime: 1000 * 60 * 5 //5 minutes for new data
    })

    const saveMutation = useMutation({
        mutationFn: (model) =>
            model.id ? tagService.updateTag(model) : tagService.addTag(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
            update({ toast: `Tag save with success` })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
            update({ toast: `Tag was deleted` })
        },
    })

    useEffect(() => {
        if (pageData) {
            const dataUpdateDataModel = updateDataModelMap({ data: pageData, type: 'tag', scope: 'core' })
            updateDataModel(dataUpdateDataModel)
        }
    }, [pageData, updateDataModel])

    useEffect(() => {
        if (modalData) {
            const dataUpdateDataModel = updateDataModelMap({ data: modalData, type: 'tag', scope: 'support' })
            updateDataModel(dataUpdateDataModel)
        }
    }, [modalData, updateDataModel])

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