import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as goalService from '../goalService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const useGoalModel = (filters = {}) => {
  console.log('FILTYY - ', filters)
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

  return {
    data,
    error,
    loading: isLoading,
    refetch,
    save: saveMutation.mutate,
    remove: removeMutation.mutate,
    saving: saveMutation.isPending,
    removing: removeMutation.isPending,
  }
}