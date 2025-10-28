import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as goalService from '../../services/goalService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

const GoalModelContext = createContext()

export const GoalModelProvider = ({ children, filters = {} }) => {
  const queryClient = useQueryClient()

  const validFilter = Object.entries(filters).find(
    ([key, value]) =>
      (typeof value === 'number' || value === 'all') &&
      filterServiceFnMap[key]
  )

  const queryKey = ['goals', filters]

  const queryFn = () => {
    if (!validFilter) return Promise.resolve([])
    const [key, value] = validFilter
    const fnName = filterServiceFnMap[key]
    return goalService[fnName](value)
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
        ? goalService.updateGoal(model)
        : goalService.addGoal(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: (id) => goalService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })

  return (
    <GoalModelContext.Provider value={{
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
    </GoalModelContext.Provider>
  )
}

export const useGoalProvider = () => useContext(GoalModelContext)