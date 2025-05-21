import { useContext, useState, useEffect } from 'react'

import { ManageModelContext } from '../../../provider/ManageModelProvider'

import * as goalAction from '../../../provider/goal/goalAction'
import * as assignmentAction from '../../../provider/assignment/assignmentAction'

import ModalDetailsSection from '../items/modals/modal_details/ModalDetailsSection'

const ModalDetails = (props) => {
    const [error, setError] = useState(null)
    const [genericModel, setGenericModel] = useState({
        name: '',
        description: '',
        end: '',
    })

    const { selectModel } = useContext(ManageModelContext)
    const typeDetail = props?.type

    useEffect(() => {
        const loadGoal = async (id) => {
            if (id === null) { return }

            try {
                typeDetail === 'goal' ?
                setGenericModel(await goalAction.getGoal(id)) : setGenericModel(await assignmentAction.getAssignment(id))
            }
            catch (error) {
                setError(`Ops, something wrong to open this : ${typeDetail}`)
            }
        } 
        loadGoal(selectModel)
    }, [selectModel])

    return (
        error ? <div className='error'>{error}</div> :
        <div className='container-modaldetails aside-content'>
            <ModalDetailsSection model={genericModel} type={typeDetail} />
        </div>
    )
}

export default ModalDetails