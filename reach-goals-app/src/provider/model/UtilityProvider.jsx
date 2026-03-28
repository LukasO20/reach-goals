import { createContext, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useTitle } from '../ui/TitleProvider'
import { useManageModel } from './ManageModelProvider'
import { useCheckbox } from '../ui/CheckboxProvider'
import { useVisibility } from '../ui/VisibilityProvider'

import * as commonService from '../../services/common'

const UtilityContext = createContext()

export const UtilityProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const { update } = useTitle()
    const { model } = useManageModel()
    const { resetCheckbox } = useCheckbox()
    const { visibleElements } = useVisibility()

    const queryKeyGoalPage = ['goals', 'page', model.filter.goal.page]
    const queryKeyAssignmentPage = ['assignments', 'page', model.filter.assignment.page]
    const queryKeyTagModal = ['tags', 'modal', model.filter.tag.modal]

    const saveModelStatus = useMutation({
        mutationFn: ({ data, status }) => commonService.updateModelStatus(data, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyGoalPage })
            queryClient.invalidateQueries({ queryKey: queryKeyAssignmentPage })
            resetCheckbox({ keys: ['page'] })
            update({ toast: `Status save with success` })
        }
    })

    const removeModels = useMutation({
        mutationFn: ({ data }) => commonService.removeModels(data),
        onSuccess: () => {
            const isTagScope = !!visibleElements.includes('modal-right') && !!visibleElements.includes('tag')
            const resetKey = isTagScope ? 'modal' : 'page'

            queryClient.invalidateQueries({ queryKey: queryKeyGoalPage })
            queryClient.invalidateQueries({ queryKey: queryKeyAssignmentPage })
            queryClient.invalidateQueries({ queryKey: queryKeyTagModal })
            resetCheckbox({ keys: [resetKey] })
            update({ toast: `Activities removed` })
        }
    })

    return (
        <UtilityContext.Provider value={{
            saveStatus: saveModelStatus.mutate,
            savingStatus: saveModelStatus.isPending,
            savedStatusData: saveModelStatus.variables,
            removeModels: removeModels.mutate,
            removingModels: removeModels.isPending
        }}>
            {children}
        </UtilityContext.Provider>
    )
}

export const useUtilityProvider = () => useContext(UtilityContext)