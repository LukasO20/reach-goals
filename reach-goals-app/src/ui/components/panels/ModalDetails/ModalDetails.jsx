import { useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/ModalDetailsSection/ModalDetailsSection.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

const ModalDetails = (props) => {
    const { loading: goalLoading } = useGoalProvider()
    const { loading: assignmentLoading } = useAssignmentProvider()

    const { model } = useContext(ManageModelContext)

    const typeDetail = props?.type

    return (
        <div className='container-modaldetails aside-content'>
            {
                (goalLoading || assignmentLoading) ?
                    <Loading />
                    :
                    <ModalDetailsSection model={model.formModel} type={typeDetail} />
            }
        </div>
    )
}

export default ModalDetails