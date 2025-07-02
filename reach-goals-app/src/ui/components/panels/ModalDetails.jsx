import { useState } from 'react'

import { useGetModel } from '../../../hook/useGetModel.js'

import ModalDetailsSection from '../items/modals/modal_details/ModalDetailsSection.jsx'

const ModalDetails = (props) => {
    const [error, setError] = useState(null)

    const typeDetail = props?.type
    const mapRequestProps = typeDetail === 'goal' ? 'goalSomeID' : 'assignmentSomeID'

    const requestPropsGetModel = {
        type: typeDetail,
        [mapRequestProps]: props?.modelID ?? null,
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsGetModel)

    return (
        error ? <div className='error'>{error}</div> :
        <div className='container-modaldetails aside-content'>
            <ModalDetailsSection model={Array.isArray(getData) && getData[0]} type={typeDetail} />
        </div>
    )
}

export default ModalDetails