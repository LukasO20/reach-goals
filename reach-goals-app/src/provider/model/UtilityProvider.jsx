import { createContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useTitle } from '../../provider/TitleProvider'

import * as commonService from '../../services/common'

const UtilityContext = createContext({ children })

export const UtilityProvider = () => {
    const queryClient = useQueryClient()
    const { update } = useTitle()

    const saveModelStatus = useMutation({
        mutationFn: ({ model, status }) => commonService.updateModelStatus(data = model, status),
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: main query })
            update({ toast: `Status save with success` })
        }
    })

    const removeModels = useMutation({
        mutationFn: ({ ids }) => commonService.removeModels(data = ids),
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: main query })
            update({ toast: `Activities removed` })
        }
    })

    return (
        <UtilityContext.Provider value={{
            saveStatus: saveModelStatus.mutate,
            savingStatus: saveModelStatus.isPending,
            removeModels: removeModels.mutate,
            removingModels: removeModels.isPending
        }}>
            {children}
        </UtilityContext.Provider>
    )
}

export const useUtilityProvider = () => useContext(UtilityContext)