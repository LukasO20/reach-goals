import React from 'react'
import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'
import { TagModelProvider } from './TagModelProvider.jsx'
import { filerFetchModelMap } from '../../utils/mapping/mappingUtilsProvider.js'

const ModelQueryClientProviderMap = {
    children: React.ReactNode,
    filter: filerFetchModelMap
}

export const ModelQueryClientProvider = ({
    children, filter = ModelQueryClientProviderMap.filter
} = ModelQueryClientProviderMap) => {

    console.log('WHAT - ', filter)

    return (
        <GoalModelProvider filter={filter.goal}>
            <AssignmentModelProvider filter={filter.assignment}>
                <TagModelProvider>
                    {children}
                </TagModelProvider>
            </AssignmentModelProvider>
        </GoalModelProvider>
    )
}