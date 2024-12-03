import React, { useContext, useEffect, useState } from 'react'
import { ManageModelContext } from '../../../../provider/components/ManageModelProvider'
import { Link } from 'react-router-dom'

import * as metaAction from '../../../../provider/meta/metaAction'

import '../../../styles/items/models/Meta.scss'

const Meta = () => {
    const [meta, setMeta] = useState([])
    const [erro, setErro] = useState(false)

    const { setSelectModelID } = useContext(ManageModelContext)

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const fetched = await metaAction.getMeta()
                setMeta(fetched)
            } catch (error) {
                setErro(`Failed to load meta: ${error.message}`)
            }
        }

        fetchMeta()
    }, [])

    return (
        meta.map(meta => (
            <Link>
                <div className='meta' id={meta.id} key={meta.id} onClick={(e) => setSelectModelID(e.currentTarget.id)}>
                    <div className='head'>
                        <i className='icon-st fa-solid fa-bullseye'></i><label>{meta.name}</label>
                    </div>
                    <div className='body'></div>
                </div>
            </Link>
        ))
    )
}

export default Meta