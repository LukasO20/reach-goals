import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'
import { ManageModelContext } from '../../../provider/components/ManageModelProvider'
import * as metaAction from '../../../provider/meta/metaAction'

const ModalDetails = () => {
    const [error, setError] = useState(null)
    const [meta, setMeta] = useState({
        name: '',
        description: ''
    })

    const { selectModel } = useContext(ManageModelContext)

    useEffect(() => {
        const loadMeta = async (id) => {
            if (id === null) { return }

            try {
                const getMeta = await metaAction.getMeta(id)
                setMeta(getMeta)
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }
        } 

        loadMeta(selectModel)
    }, [selectModel])

    return ReactDOM.createPortal (
        <div className='container-modaldetails aside-content'>
            <div className='header'>
                <h1>{meta.name}</h1>
            </div>
            <div className='body'>

            </div>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default ModalDetails