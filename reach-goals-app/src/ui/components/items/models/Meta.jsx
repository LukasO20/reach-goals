import { useEffect, useState } from 'react'
import * as metaAction from '../../../../provider/meta/metaAction'

import '../../../styles/items/models/Meta.scss'

const Meta = () => {
    const [meta, setMeta] = useState([])
    const [erro, setErro] = useState(false)

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
            <div className='meta' key={meta.id}>
                <div className='head'>
                    <i className='icon-st fa-solid fa-bullseye'></i><label>{meta.name}</label>
                </div>
                <div className='body'></div>
            </div>
        ))
    )
}

export default Meta