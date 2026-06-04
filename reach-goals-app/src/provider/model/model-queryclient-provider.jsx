import { GoalModelProvider } from './goal-model-provider'
import { AssignmentModelProvider } from './assignment-model-provider'
import { TagModelProvider } from './tag-model-provider'

export const ModelQueryClientProvider = ({ children }) => {

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