import { GoalModelProvider } from './GoalModelProvider.jsx'
import { AssignmentModelProvider } from './AssignmentModelProvider.jsx'

export const MasterDataProvider = ({ children }) => {
    return (
        <GoalModelProvider>
            <AssignmentModelProvider>
                {children}
            </AssignmentModelProvider>
        </GoalModelProvider>
    )
}