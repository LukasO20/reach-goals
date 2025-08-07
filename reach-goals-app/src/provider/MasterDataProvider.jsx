import { GoalModelProvider } from './GoalModelProvider.jsx'

export const MasterDataProvider = ({ children }) => {
    return (
        <GoalModelProvider>
            {children}
        </GoalModelProvider>
    )
}