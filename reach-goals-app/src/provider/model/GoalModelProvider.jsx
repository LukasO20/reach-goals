import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as goalService from '../../services/goalService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

const GoalModelContext = createContext()

export const GoalModelProvider = ({ children, filters = {} }) => {
  const queryClient = useQueryClient()

  const validFilter = (filter) => {
    if (!filter) return false
    return Object.entries(filter).find(
      ([key, value]) =>
        (typeof value === 'number' || value === 'all') &&
        filterServiceFnMap[key]
    )
  }

  const createQueryFn = (scopeFilter) => {
    const valid = validFilter(scopeFilter)
    if (!valid) return () => Promise.resolve([])
    const [key, value] = valid;
    const fnName = filterServiceFnMap[key]
    return () => goalService[fnName](value)
  }

  const {
    data: pageData,
    error: pageError,
    isLoading: isPageLoading,
    refetch: refetchPage,
  } = useQuery({
    queryKey: ['goals', 'page', filters.page],
    queryFn: createQueryFn(filters.page),
    enabled: !!validFilter(filters.page),
  })

  const {
    data: panelData,
    error: panelError,
    isLoading: isPanelLoading,
    refetch: refetchPanel,
  } = useQuery({
    queryKey: ['goal', 'panel', filters.panel],
    queryFn: createQueryFn(filters.panel),
    enabled: !!validFilter(filters.panel),
  })

  const saveMutation = useMutation({
    mutationFn: (model) =>
      typeof model.id === 'number'
        ? goalService.updateGoal(model)
        : goalService.addGoal(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: (id) => goalService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal'] })
    },
  })

  return (
    <GoalModelContext.Provider value={{
      data: pageData,
      error: pageError,
      loading: isPageLoading,
      refetch: refetchPage,
      save: saveMutation.mutate,
      remove: removeMutation.mutate,
      saving: saveMutation.isPending,
      saveSuccess: saveMutation.isSuccess,
      removing: removeMutation.isPending,
    }}>
      {children}
    </GoalModelContext.Provider>
  )
}

export const useGoalProvider = () => useContext(GoalModelContext)