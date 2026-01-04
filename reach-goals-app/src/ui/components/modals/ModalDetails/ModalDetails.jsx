import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/ModalDetailsSection/ModalDetailsSection.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

const ModalDetails = () => {
    const { loading: goalLoading } = useGoalProvider()
    const { loading: assignmentLoading } = useAssignmentProvider()

    const isLoading = !!goalLoading || !!assignmentLoading

    return (
        <>
            {isLoading ? <Loading mode='block' /> : <ModalDetailsSection />}
        </>
    )
}

export default ModalDetails