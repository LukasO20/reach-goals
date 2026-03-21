import { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as goalService from '../../services/goalService.js'
import * as commonService from '../../services/common.js'

import { useManageModel } from '../ManageModelProvider.jsx'
import { useTitle } from '../../provider/TitleProvider.jsx'

import { filterServiceFnMap, updateDataModelMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { validFilter } from '../../utils/utilsProvider.js'

const GoalModelContext = createContext()

export const GoalModelProvider = ({ children, filters = {} }) => {
  const queryClient = useQueryClient()
  const { updateDataModel } = useManageModel()
  const { update } = useTitle()

  const queryKeyPage = ['goals', 'page', filters.page]
  const queryKeyModal = ['goal', 'modal', filters.modal]

  const createQueryFn = (scopeFilter) => {
    const valid = validFilter(scopeFilter)
    if (!valid) return () => Promise.resolve([])
    const [key, value] = valid
    const fnName = filterServiceFnMap[key]
    return () => goalService[fnName](value)
  }

  const {
    data: pageData,
    error: pageError,
    isLoading: isPageLoading,
  } = useQuery({
    queryKey: queryKeyPage,
    queryFn: createQueryFn(filters.page),
    enabled: !!validFilter(filters.page),
    staleTime: 1000 * 60 * 5 //5 minutes for new data
  })

  const {
    data: modalData,
    error: modalError,
    isLoading: isModalLoading,
  } = useQuery({
    queryKey: queryKeyModal,
    queryFn: createQueryFn(filters.modal),
    enabled: !!validFilter(filters.modal),
        staleTime: 1000 * 60 * 5 //5 minutes for new data
  })

  const saveMutation = useMutation({
    mutationFn: (model) => !!model.id ? goalService.updateGoal(model) : goalService.addGoal(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyPage })
      update({ toast: `Goal save with success` })
    }
  })

  const saveDragDropMutation = useMutation({
    mutationFn: (dragDropResult) => {
      const updatedDataQuery = queryClient.getQueryData(queryKeyPage)

      const updatedModel = updatedDataQuery.filter((item) => item.status === dragDropResult.destination.droppableId)
      commonService.updateModelDragDrop({ data: updatedModel, typeModel: 'goal' })
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeyPage })

      const previousDataQuery = queryClient.getQueryData(queryKeyPage)

      queryClient.setQueryData(queryKeyPage, (oldData) => {
        if (!oldData) return []

        const { destination, draggableId } = newData

        let newArray = [...oldData]

        const itemIndex = newArray.findIndex(i => i.id === Number(draggableId))
        const movedItem = { ...newArray[itemIndex] }

        movedItem.status = destination.droppableId

        newArray.splice(itemIndex, 1)

        const columnItems = newArray
          .filter(i => i.status === destination.droppableId)
          .sort((a, b) => a.order - b.order)

        columnItems.splice(destination.index, 0, movedItem)

        columnItems.forEach((item, idx) => {
          item.order = idx
        })

        const otherItems = newArray.filter(i => !(i.status === destination.droppableId))

        return [...otherItems, ...columnItems]
      })

      return { previousDataQuery }
    },
    onSuccess: () => {
      update({ toast: `Goal status save with success` })
    }
  })

  const removeMutation = useMutation({
    mutationFn: (id) => goalService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyPage })
      update({ toast: `Goal was deleted` })
    },
  })

  useEffect(() => {
    const dataUpdateDataModel = updateDataModelMap({ data: pageData, type: 'goal', scope: 'core' })
    updateDataModel(dataUpdateDataModel)
  }, [pageData, updateDataModel])

  useEffect(() => {
    const dataUpdateDataModel = updateDataModelMap({ data: modalData, type: 'goal', scope: 'support' })
    updateDataModel(dataUpdateDataModel)
  }, [modalData, updateDataModel])

  return (
    <GoalModelContext.Provider value={{
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
      saveDragDrop: saveDragDropMutation.mutate,
      remove: removeMutation.mutate,
      removeSuccess: removeMutation.isSuccess,
      removing: removeMutation.isPending,
      removingVariables: removeMutation.variables,
      resetSave: saveMutation.reset
    }}>
      {children}
    </GoalModelContext.Provider>
  )
}

export const useGoalProvider = () => useContext(GoalModelContext)