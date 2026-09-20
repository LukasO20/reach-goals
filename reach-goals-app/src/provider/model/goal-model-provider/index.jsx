import { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as goalService from '../../../services/goal-service.js'
import * as commonService from '../../../services/common.js'

import { useManageModel } from '../manage-model-provider'
import { useTitle } from '../../ui/title-provider'

import { updateDataModelMap } from '../../../utils/mapping/mapping-utils-provider.js'
import { createQueryFn, validFilter } from '../../../utils/utils-provider.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').GoalModelContextValue} GoalModelContextValue */

/** @type {React.Context<GoalModelContextValue>} */
const GoalModelContext = createContext()

export const GoalModelProvider = ({ children }) => {
    const {
        model: { filter: filterModel },
        updateDataModel,
        resetManageModel,
    } = useManageModel()
    const { update } = useTitle()

    const queryClient = useQueryClient()

    const filterPage = filterModel.goal.page
    const filterModal = filterModel.goal.modal

    const queryKeyPage = ['goal', 'page', filterPage]
    const queryKeyModal = ['goal', 'modal', filterModal]

    const invalidateTargetQueries = (invalidTag = false) => {
        queryClient.invalidateQueries({ queryKey: ['goal'] })
        queryClient.invalidateQueries({ queryKey: ['assignment'] })
        queryClient.invalidateQueries({ queryKey: ['demo-session'] })

        if (invalidTag) queryClient.invalidateQueries({ queryKey: ['tag'] })
    }

    const {
        data: pageData,
        error: pageError,
        isLoading: isPageLoading,
        isFetching: isPageFetching,
    } = useQuery({
        queryKey: queryKeyPage,
        queryFn: createQueryFn(filterPage, goalService),
        enabled: validFilter(filterPage, 'some'),
        staleTime: 1000 * 60 * 5, //5 minutes for new data
    })

    const {
        data: modalData,
        error: modalError,
        isLoading: isModalLoading,
    } = useQuery({
        queryKey: queryKeyModal,
        queryFn: createQueryFn(filterModal, goalService),
        enabled: validFilter(filterModal, 'some'),
        staleTime: 1000 * 60 * 5, //5 minutes for new data
    })

    const saveMutation = useMutation({
        mutationFn: (model) =>
            model.id
                ? goalService.updateGoal(model)
                : goalService.addGoal(model),
        onSuccess: (data) => {
            const shouldInvalidateTagQueries = data.tags.length > 0

            update({ toast: 'Goal save with success' })
            resetManageModel({ keys: ['activeModel', 'mainModelID'] })
            invalidateTargetQueries(shouldInvalidateTagQueries)
        },
    })

    const saveDragDropMutation = useMutation({
        mutationFn: (dragDropResult) => {
            const updatedDataQuery = queryClient.getQueryData(queryKeyPage)

            const updatedModel = updatedDataQuery.filter(
                (item) => item.status === dragDropResult.destination.droppableId
            )
            commonService.updateModelDragDrop({
                data: updatedModel,
                typeModel: 'goal',
            })
        },
        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: queryKeyPage })

            const previousDataQuery = queryClient.getQueryData(queryKeyPage)

            queryClient.setQueryData(queryKeyPage, (oldData) => {
                if (!oldData) return []

                const { destination, draggableId } = newData

                let newArray = [...oldData]

                const itemIndex = newArray.findIndex(
                    (i) => i.id === draggableId
                )
                const movedItem = { ...newArray[itemIndex] }

                movedItem.status = destination.droppableId

                newArray.splice(itemIndex, 1)

                const columnItems = newArray
                    .filter((i) => i.status === destination.droppableId)
                    .sort((a, b) => a.order - b.order)

                columnItems.splice(destination.index, 0, movedItem)

                columnItems.forEach((item, idx) => {
                    item.order = idx
                })

                const otherItems = newArray.filter(
                    (i) => !(i.status === destination.droppableId)
                )

                return [...otherItems, ...columnItems]
            })

            return { previousDataQuery }
        },
        onSuccess: () => {
            update({ toast: `Goal status save with success` })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => goalService.deleteGoal(id),
        onSuccess: () => {
            update({ toast: `Goal was deleted` })
            invalidateTargetQueries(true)
        },
    })

    useEffect(() => {
        if (pageData) {
            const dataUpdateDataModel = updateDataModelMap({
                data: pageData,
                type: 'goal',
                scope: 'core',
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [pageData, updateDataModel])

    useEffect(() => {
        if (modalData) {
            const dataUpdateDataModel = updateDataModelMap({
                data: modalData,
                type: 'goal',
                scope: 'support',
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [modalData, updateDataModel])

    return (
        <GoalModelContext.Provider
            value={{
                page: {
                    data: pageData,
                    error: pageError,
                    loading: isPageLoading,
                    fetching: isPageFetching,
                },
                modal: {
                    data: modalData,
                    error: modalError,
                    loading: isModalLoading,
                },
                save: saveMutation.mutate,
                saving: saveMutation.isPending,
                saveSuccess: saveMutation.isSuccess,
                saveDragDrop: saveDragDropMutation.mutate,
                remove: removeMutation.mutate,
                removeSuccess: removeMutation.isSuccess,
                removing: removeMutation.isPending,
                removingVariables: removeMutation.variables,
                resetSave: saveMutation.reset,
            }}
        >
            {children}
        </GoalModelContext.Provider>
    )
}

export const useGoalProvider = () => useContext(GoalModelContext)
