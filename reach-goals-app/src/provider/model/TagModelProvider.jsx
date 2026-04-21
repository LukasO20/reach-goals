import React, { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as tagService from '../../services/tagService.js'

import { useManageModel } from './ManageModelProvider.jsx'
import { useTitle } from '../../provider/ui/TitleProvider.jsx'

import { updateDataModelMap, filerFetchModelMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { createQueryFn, validFilter } from '../../utils/utilsProvider.js'

export const TagModelContext = createContext()

const TagModelProviderMap = {
    children: React.ReactNode,
    filter: filerFetchModelMap
}

export const TagModelProvider = ({ children, filter } = TagModelProviderMap) => {
    const { model: { filter: filterModel }, updateDataModel, setFilterModel } = useManageModel()
    const { update } = useTitle()

    const queryClient = useQueryClient()
    const filterKey = JSON.stringify(filter.tag)

    useEffect(() => {
        if (filter.tag) setFilterModel(filter, 'tag')
    }, [filterKey, setFilterModel, filter])

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