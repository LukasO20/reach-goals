import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/modal-details-section'
import Loading from '../../items/elements/loading/index.jsx'

const ModalDetails = () => {
    const { loading: goalLoading } = useGoalProvider()
    const { loading: assignmentLoading } = useAssignmentProvider()

    const isLoading = !!goalLoading || !!assignmentLoading

    return isLoading ? <Loading mode='block' /> : <ModalDetailsSection />

}

export default ModalDetails