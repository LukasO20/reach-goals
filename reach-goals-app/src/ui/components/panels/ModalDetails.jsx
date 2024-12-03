import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'
import { ManageModelContext } from '../../../provider/components/ManageModelProvider'
import * as metaAction from '../../../provider/meta/metaAction'

const ModalDetails = () => {
    const [error, setError] = useState(null)
    const { selectModelID, setSelectModelID } = useContext(ManageModelContext)

    const loadMeta = async (id) => {
        try {
            const getMeta = await metaAction.getMeta(id)
            console.log('THIS GETED - ', getMeta)
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
    } 

    return ReactDOM.createPortal (
        <div className='container-modaldetails aside-content'>
            <div className='header'>
                <h1>TEST...</h1>
            </div>
            <div className='body'>

            </div>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default ModalDetails