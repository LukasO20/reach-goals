import { useContext, useEffect, useState } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'

import ModalDetailsSection from '../../items/modals/ModalDetailsSection/ModalDetailsSection.jsx'

const ModalDetails = (props) => {
    const { data: dataAssignment, refetch: refetchAssignment } = useAssignmentProvider()
    const { data: dataGoal, refetch: refetchGoal } = useGoalProvider()

    const { model, setModel, updateFilterModel } = useContext(ManageModelContext)

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const typeDetail = props?.type
    const currentKeySomeID = `${typeDetail}SomeID`

    const loadModel = async (id) => {
        setLoading(true)
        if (!id) return setLoading(false)

        const filterGetModel = {
            [currentKeySomeID]: id,
            type: typeDetail,
            source: 'selected'
        }

        try {
            const refetchFn =
                typeDetail === 'goal'
                    ? () => refetchGoal(updateFilterModel(filterGetModel, 'goal'))
                    : typeDetail === 'assignment'
                        ? () => refetchAssignment(updateFilterModel(filterGetModel, 'assignment'))
                        : () => null

            refetchFn()
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
            typeDetail === 'goal' ?
                dataGoal :
                typeDetail === 'assignment' ?
                    dataAssignment : null

        const selectedSubmitModel = Array.isArray(typeSelected) ? typeSelected[0] : typeSelected
        if (selectedSubmitModel && Object.keys(selectedSubmitModel).length) {
            setModel(prevModel => ({
                ...prevModel,
                submitModel: selectedSubmitModel
            }))
        }
    }, [dataGoal, dataAssignment])

    return (
        isLoading ?
            '...loading' :
            <div className='container-modaldetails aside-content'>
                <ModalDetailsSection model={model.submitModel} type={typeDetail} />
            </div>
    )
}

export default ModalDetails