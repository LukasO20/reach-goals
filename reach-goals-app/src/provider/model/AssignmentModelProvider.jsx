import { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as assignmentService from '../../services/assignmentService.js'

import { useManageModel } from '../ManageModelProvider.jsx'
import { useTitle } from '../../provider/TitleProvider.jsx'

import { filterServiceFnMap, updateDataModelMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { validFilter } from '../../utils/utilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children, filters = {} }) => {
    const queryClient = useQueryClient()
    const { updateDataModel } = useManageModel()
    const { update } = useTitle()

    const queryKeyPage = ['assignments', 'page', filters.page]
    const queryKeyModal = ['assignment', 'modal', filters.modal]

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
        mutationFn: (model) => !!model.id ? assignmentService.updateAssignment(model) : assignmentService.addAssignment(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
            update({ toast: `Assignment save with success` })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => assignmentService.deleteAssignment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
            update({ toast: `Assignment was deleted` })
        },
    })

    useEffect(() => {
        const dataUpdateDataModel = updateDataModelMap({ data: pageData, type: 'assignment', scope: 'core' })
        updateDataModel(dataUpdateDataModel)
    }, [pageData, updateDataModel])

    useEffect(() => {
        const dataUpdateDataModel = updateDataModelMap({ data: modalData, type: 'assignment', scope: 'support' })
        updateDataModel(dataUpdateDataModel)
    }, [modalData, updateDataModel])

    return (
        <AssignmentModelContext.Provider value={{
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
        </AssignmentModelContext.Provider>
    )
}

export const useAssignmentProvider = () => useContext(AssignmentModelContext)