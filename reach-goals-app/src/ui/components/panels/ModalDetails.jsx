import { useAssignmentModel } from '../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalModel } from '../../../provider/model/GoalModelProvider.jsx'
import { useTagModel } from '../../../provider/model/TagModelProvider.jsx'

import { useEffect } from 'react'

import { filterModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import ModalDetailsSection from '../items/modals/modal_details/ModalDetailsSection.jsx'

const ModalDetails = (props) => {
    const { selected: selectedAssignment, refetch: refetchAssignment } = useAssignmentModel()
    const { selected: selectedGoal, refetch: refetchGoal } = useGoalModel()
    const { selected: selectedTag, refetch: refetchTag } = useTagModel()

    const typeDetail = props?.type
    const mapRequestProps = typeDetail === 'goal' ? 'goalSomeID' : 'assignmentSomeID'

    const filterGetModel = {
        ...filterModelMap,
        type: typeDetail,
        [mapRequestProps]: props?.modelID ?? null
    }

    useEffect(() => {
        if (typeDetail === 'goal') refetchGoal(filterGetModel)
        if (typeDetail === 'assignment') refetchAssignment(filterGetModel)
        if (typeDetail === 'tag') refetchTag(filterGetModel)
    }, [props?.modelID])

    return (
        <div className='container-modaldetails aside-content'>
            <ModalDetailsSection model={
                typeDetail === 'goal' ? selectedGoal[0] :
                typeDetail === 'assignment' ? selectedAssignment[0] :
                typeDetail === 'tag' ? selectedTag[0] : {}
            } type={typeDetail} />
        </div>
    )
}

export default ModalDetails