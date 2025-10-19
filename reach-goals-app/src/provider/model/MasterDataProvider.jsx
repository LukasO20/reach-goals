import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'
import { TagModelProvider } from './TagModelProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const MasterDataProvider = ({ children }) => {
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