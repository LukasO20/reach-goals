import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as assignmentService from '../../services/assignmentService.js'

import { filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { validFilter } from '../../utils/utilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children, filters = {} }) => {
    const queryClient = useQueryClient()

    const createQueryFn = (scopeFilter) => {
        const valid = validFilter(scopeFilter)
        if (!valid) return () => Promise.resolve([])
        const [key, value] = valid;
        const fnName = filterServiceFnMap[key]
        return () => assignmentService[fnName](value)
    }

    const {
        data: pageData,
        error: pageError,
        isLoading: isPageLoading,
    } = useQuery({
        queryKey: ['assignments', 'page', filters.page],
        queryFn: createQueryFn(filters.page),
        enabled: !!validFilter(filters.page),
    })

    const {
        data: panelData,
        error: panelError,
        isLoading: isPanelLoading,
    } = useQuery({
        queryKey: ['assignment', 'panel', filters.panel],
        queryFn: createQueryFn(filters.panel),
        enabled: !!validFilter(filters.panel),
    })

    const queryKeyPage = ['assignments', 'page', filters.page]

    const saveMutation = useMutation({
        mutationFn: (model) =>
            typeof model.id === 'number'
                ? assignmentService.updateAssignment(model)
                : assignmentService.addAssignment(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => assignmentService.deleteAssignment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
        },
    })

    return (
        <AssignmentModelContext.Provider value={{
            page: {
                data: pageData,
                error: pageError,
                loading: isPageLoading,
            },
            panel: {
                data: panelData,
                error: panelError,
                loading: isPanelLoading,
            },
            save: saveMutation.mutate,
            remove: removeMutation.mutate,
            saving: saveMutation.isPending,
            saveSuccess: saveMutation.isSuccess,
            removing: removeMutation.isPending,
        }}>
            {children}
        </AssignmentModelContext.Provider>
    )
}

export const useAssignmentProvider = () => useContext(AssignmentModelContext)