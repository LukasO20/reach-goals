import { createContext, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useTitle } from '../../ui/title-provider'
import { useCheckbox } from '../../ui/checkbox-provider'
import { useVisibility } from '../../ui/visibility-provider'

import * as commonService from '../../../services/common'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').UtilityContextValue} UtilityContextValue */

/** @type {React.Context<UtilityContextValue>} */
const UtilityContext = createContext()

export const UtilityProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const { update } = useTitle()
    const { resetCheckbox } = useCheckbox()
    const { visibleElements } = useVisibility()

    const invalidateTargetQueries = (invalidDemoSession = false) => {
        queryClient.invalidateQueries({ queryKey: ['tag'] })
        queryClient.invalidateQueries({ queryKey: ['goal'] })
        queryClient.invalidateQueries({ queryKey: ['assignment'] })

        if (invalidDemoSession)
            queryClient.invalidateQueries({ queryKey: ['demo-session'] })
    }

    const saveModelStatus = useMutation({
        mutationFn: ({ data, status }) =>
            commonService.updateModelStatus(data, status),
        onSuccess: () => {
            invalidateTargetQueries()
            resetCheckbox({ keys: ['page'] })
            update({ toast: 'Status save with success' })
        },
    })

    const removeModels = useMutation({
        mutationFn: ({ data }) => commonService.removeModels(data),
        onSuccess: () => {
            const isTagScope =
                !!visibleElements.includes('modal-right') &&
                !!visibleElements.includes('tag')
            const resetKey = isTagScope ? 'modal' : 'page'

            invalidateTargetQueries(true)
            resetCheckbox({ keys: [resetKey] })
            update({ toast: `Activities removed` })
        },
    })

    return (
        <UtilityContext.Provider
            value={{
                saveStatus: saveModelStatus.mutate,
                savingStatus: saveModelStatus.isPending,
                savedStatusData: saveModelStatus.variables,
                removeModels: removeModels.mutate,
                removingModels: removeModels.isPending,
            }}
        >
            {children}
        </UtilityContext.Provider>
    )
}

export const useUtilityProvider = () => useContext(UtilityContext)
