import React from 'react'
import { GoalModelProvider } from './goal-model-provider'
import { AssignmentModelProvider } from './assignment-model-provider'
import { TagModelProvider } from './tag-model-provider'
import { filerFetchModelMap } from '../../utils/mapping/mappingUtilsProvider.js'


const ModelQueryClientProviderMap = {
    children: React.ReactNode,
    filter: filerFetchModelMap
}

export const ModelQueryClientProvider = ({
    children, filter = ModelQueryClientProviderMap.filter
} = ModelQueryClientProviderMap) => {

    return (
        <GoalModelProvider filter={filter}>
            <AssignmentModelProvider filter={filter}>
                <TagModelProvider filter={filter}>
                    {children}
                </TagModelProvider>
            </AssignmentModelProvider>
        </GoalModelProvider>
    )
}