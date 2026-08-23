import { useEffect } from 'react'
import { useAssignmentProvider } from '../../../provider/model/assignment-model-provider'
import { useGoalProvider } from '../../../provider/model/goal-model-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'

import Loading from '../../elements/loading'
import ModalDetailsContent from './components/modal-details-content.jsx'

import './style.scss'

const ModalDetails = () => {
    const {
        modal: { data: dataGoal = [], loading: loadingGoal },
    } = useGoalProvider()
    const {
        modal: { data: dataAssignment = [], loading: loadingAssignment },
    } = useAssignmentProvider()
    const {
        model: { typeModel, activeModel },
        setModel,
    } = useManageModel()

    const selectedModel = typeModel === 'goal' ? dataGoal[0] : dataAssignment[0]

    const isLoading = !!loadingGoal || !!loadingAssignment

    useEffect(() => {
        if (selectedModel) {
            setModel((prevModel) => ({
                ...prevModel,
                activeModel: selectedModel,
            }))
        }
    }, [selectedModel, setModel])

    return (
        <>
            {isLoading && <Loading mode='block' />}
            {!isLoading && (
                <ModalDetailsContent type={typeModel} {...activeModel} />
            )}
        </>
    )
}

export default ModalDetails
