import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/modal-details-section'
import Loading from '../../items/elements/loading' 

const ModalDetails = () => {
    const { modal: { loading: loadingGoal } } = useGoalProvider()
    const { modal: { loading: loadingAssignment } } = useAssignmentProvider()

    const isLoading = !!loadingGoal || !!loadingAssignment

    //TODO: USE DATA FROM PROVIDERS TO SEND FOR ModalDetailsSection
    return isLoading ? <Loading mode='block' /> : <ModalDetailsSection />

}

export default ModalDetails