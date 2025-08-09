import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'
import { TagModelProvider } from './TagModelProvider.jsx'

export const MasterDataProvider = ({ children }) => {
    return (
        <GoalModelProvider>
            <AssignmentModelProvider>
                <TagModelProvider>
                    {children}
                </TagModelProvider>
            </AssignmentModelProvider>
        </GoalModelProvider>
    )
}