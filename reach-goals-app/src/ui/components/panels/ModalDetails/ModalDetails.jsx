import { useContext, useEffect, useState } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useAssignmentModel } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/ModalDetailsSection/ModalDetailsSection.jsx'

const ModalDetails = (props) => {
    const { selected: selectedAssignment, refetch: refetchAssignment } = useAssignmentModel()
    //const { selected: selectedGoal, refetch: refetchGoal } = useGoalModel()

    const { model, setModel } = useContext(ManageModelContext)

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const typeDetail = props?.type
    const currentKeySomeID = `${typeDetail}SomeID`

    const loadModel = async (id) => {
        setLoading(true)
        if (!id) return setLoading(false)

        const currentUseGetModel = {
            type: typeDetail,
            [currentKeySomeID]: id
        }

        try {
            const refetchFn =
                /*typeDetail === 'goal'
                    ? () => refetchGoal(currentUseGetModel)
                    :*/ typeDetail === 'assignment'
                        ? () => refetchAssignment(currentUseGetModel)
                        : () => null

            await refetchFn()
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (typeof model.mainModelID === 'number') loadModel(model.mainModelID)
    }, [model.mainModelID])

    useEffect(() => {
        const typeSelected =
            // typeDetail === 'goal' ?
            //     selectedGoal :
                typeDetail === 'assignment' ?
                    selectedAssignment : null

        const selectedSubmitModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
        if (selectedSubmitModel && Object.keys(selectedSubmitModel).length) {
            setModel(prevModel => ({
                ...prevModel,
                submitModel: selectedSubmitModel
            }))
        }
    }, [/*selectedGoal*/, selectedAssignment])

    return (
        isLoading ?
            <div id="load-element" className='loading-animation'></div> :
            <div className='container-modaldetails aside-content'>
                <ModalDetailsSection model={model.submitModel} type={typeDetail} />
            </div>
    )
}

export default ModalDetails