import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'

import Loading from '../../items/elements/loading'
import ModalDetailsContent from './components/modal-details-content.jsx'

import './style.scss'

const ModalDetails = () => {
    const { modal: { data: dataGoal = [], loading: loadingGoal } } = useGoalProvider()
    const { modal: { data: dataAssignment = [], loading: loadingAssignment } } = useAssignmentProvider()
    const { model: { typeModel, mainModelID } } = useManageModel()

    const dataModel = typeModel === 'goal' ? dataGoal[0] : dataAssignment[0]

    const output = {
        type: typeModel,
        mainModelID,
        ...dataModel
    }

    const isLoading = !!loadingGoal || !!loadingAssignment

    return (
        <>
            {isLoading && (<Loading mode='block' />)}
            {!isLoading && (<ModalDetailsContent {...output} />)}
        </>
    )
}

export default ModalDetails