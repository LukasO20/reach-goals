import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { ManageModelContext } from '../../../../provider/components/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'
import { Link } from 'react-router-dom'

import ButtonAction from '../elements/ButtonAction'
import * as metaAction from '../../../../provider/meta/metaAction'

import '../../../styles/items/models/Meta.scss'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = { class: data }
    return attributes
}

const Meta = () => {
    const [meta, setMeta] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const target = useMemo(() => targetMap('panel-left'), []) 

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

    const editMeta = useCallback(async (id) => {
        try {
            const fetched = await metaAction.getMeta(id)
            setSelectModel(fetched.id)
        } catch (error) {
            setErro(`Failed to edit this meta: ${erro.message}`)
        }
    }, [setSelectModel])

    const handleMetaClick = useCallback(
        (id, e) => {
            setSelectModel(id)
            toggleVisibility(target, e)
        },
        [setSelectModel, toggleVisibility, target]
    )

    return (
        meta.map(meta => (       
            <div className='meta' id={meta.id} key={meta.id} onClick={(e) => handleMetaClick(meta.id, e)}>
                <Link to={`${currentLocation}/details`}>
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-bullseye'></i><label>{meta.name}</label></label>
                    </div>
                    <div className='body'></div>
                </Link>
                <div className='side-actions'>
                    <ButtonAction onClick={() => editMeta(meta.id)} target={targetMap(['panel-center', 'goal'])} classBtn='edit-meta' iconFa='fa-regular fa-pen-to-square'/>
                    <ButtonAction onClick={() => deleteMeta(meta.id)} target={targetMap(null)} classBtn='remove-meta' iconFa='fa-regular fa-trash-can'/>
                </div>
            </div>
        ))
    )
}

export default Meta