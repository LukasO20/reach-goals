import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as assignmentService from '../../services/assignmentService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children, filters = {} }) => {
    const queryClient = useQueryClient()

    const validFilter = Object.entries(filters).find(
        ([key, value]) =>
            (typeof value === 'number' || value === 'all') &&
            filterServiceFnMap[key]
    )

    const queryKey = ['assignments', filters]

    const queryFn = () => {
        if (!validFilter) return Promise.resolve([])
        const [key, value] = validFilter
        const fnName = filterServiceFnMap[key]
        return assignmentService[fnName](value)
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
                ? assignmentService.updateAssignment(model)
                : assignmentService.addAssignment(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => assignmentService.deleteAssignment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] })
        },
    })

    return (
        <AssignmentModelContext.Provider value={{
            data,
            error,
            loading: isLoading,
            refetch,
            save: saveMutation.mutate,
            remove: removeMutation.mutate,
            saving: saveMutation.isPending,
            removing: removeMutation.isPending,
        }}>
            {children}
        </AssignmentModelContext.Provider>
    )
}

export const useAssignmentProvider = () => useContext(AssignmentModelContext)