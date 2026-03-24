import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'
import { TagModelProvider } from './TagModelProvider.jsx'

const queryClient = new QueryClient()

export const ModelQueryClientProvider = ({ children }) => {
    
    return (
        <QueryClientProvider client={queryClient}>
            <GoalModelProvider>
                <AssignmentModelProvider>
                    <TagModelProvider>
                        {children}
                    </TagModelProvider>
                </AssignmentModelProvider>
            </GoalModelProvider>
        </QueryClientProvider>
    )
}