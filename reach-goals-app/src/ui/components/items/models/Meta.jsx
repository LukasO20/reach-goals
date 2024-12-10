import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { ManageModelContext } from '../../../../provider/components/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'
import { Link } from 'react-router-dom'

import * as metaAction from '../../../../provider/meta/metaAction'

import '../../../styles/items/models/Meta.scss'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
    }
    return attributes
}

const Meta = () => {
    const [meta, setMeta] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)

    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    const target = targetMap('panel-left')

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

    const deleteMeta = async (id) => {
        try {
            await metaAction.deleteMeta(id)
            setMeta((prevMeta) => prevMeta.filter((meta) => meta.id != id))
        } catch (error) {
            setErro(`Failed to delete meta: ${erro.message}`)
        }
    }

    const editMeta = async (id) => {
        try {
            const fetched = await metaAction.getMeta(id)
            setSelectModel(fetched)

        } catch (error) {
            setErro(`Failed to edit this meta: ${erro.message}`)
        }
    }

    return (
        meta.map(meta => (       
            <div className='meta' id={meta.id} key={meta.id} onClick={(e) => (setSelectModel(e.currentTarget.id), toggleVisibility(target, e))}>
                <Link to={`${currentLocation}/details`}>
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-bullseye'></i><label>{meta.name}</label></label>
                    </div>
                    <div className='body'></div>
                </Link>
                <div className='side-actions'>
                    <label className='line-info'><i className='icon-st fa-regular fa-trash-can' onClick={(e) => (deleteMeta(meta.id), e.stopPropagation())}></i></label>
                    <label className='line-info'><i className='icon-st fa-regular fa-pen-to-square' onClick={(e) => (editMeta(meta.id), e.stopPropagation())}></i></label>
                </div>
            </div>
        ))
    )
}

export default Meta