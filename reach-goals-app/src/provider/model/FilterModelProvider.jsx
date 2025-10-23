import { useContext } from 'react'

import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'
import { TagModelProvider } from './TagModelProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ManageModelContext } from '../ManageModelProvider.jsx'

const queryClient = new QueryClient()

export const FilterModelProvider = ({ children }) => {
    const { model } = useContext(ManageModelContext)

    return (
        <QueryClientProvider client={queryClient}>
            <GoalModelProvider filters={model.filter.goal}>
                <AssignmentModelProvider filters={model.filter.assignment}>
                    <TagModelProvider filters={model.filter.tag}>
                        {children}
                    </TagModelProvider>
                </AssignmentModelProvider>
            </GoalModelProvider>
        </QueryClientProvider>
    )
}