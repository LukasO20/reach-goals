import { createContext, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import * as assignmentService from '../../services/assignmentService.js'
import * as commonService from '../../services/common.js'

import { useManageModel } from '../ManageModelProvider.jsx'
import { useTitle } from '../../provider/TitleProvider.jsx'

import { filterServiceFnMap, updateDataModelMap } from '../../utils/mapping/mappingUtilsProvider.js'
import { validFilter } from '../../utils/utilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const { model, updateDataModel } = useManageModel()
    const { update } = useTitle()

    const queryKeyPage = ['assignments', 'page', model.filter.assignment.page]
    const queryKeyModal = ['assignment', 'modal', model.filter.assignment.modal]

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
        queryFn: createQueryFn(model.filter.assignment.page),
        enabled: validFilter(model.filter.assignment.page, 'some'),
        staleTime: 1000 * 60 * 5 //5 minutes for new data
    })

    const {
        data: modalData,
        error: modalError,
        isLoading: isModalLoading,
    } = useQuery({
        queryKey: queryKeyModal,
        queryFn: createQueryFn(model.filter.assignment.modal),
        enabled: validFilter(model.filter.assignment.modal, 'some'),
        staleTime: 1000 * 60 * 5 //5 minutes for new data
    })

    const saveMutation = useMutation({
        mutationFn: (model) => !!model.id ? assignmentService.updateAssignment(model) : assignmentService.addAssignment(model),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPage })
            update({ toast: `Assignment save with success` })
        },
    })

    const saveDragDropMutation = useMutation({
        mutationFn: (dragDropResult) => {
            const updatedDataQuery = queryClient.getQueryData(queryKeyPage)

            const updatedModel = updatedDataQuery.filter((item) => item.status === dragDropResult.destination.droppableId)
            commonService.updateModelDragDrop({ data: updatedModel, typeModel: 'assignment' })
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
            update({ toast: `Assignment status save with success` })
        }
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
            saveDragDrop: saveDragDropMutation.mutate,
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