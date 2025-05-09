import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom' 

import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'
import { insertModelComponent } from '../../../utils/layout/uiLayout'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils'

import ButtonAction from '../elements/ButtonAction'
import * as tagAction from '../../../../provider/tag/tagAction'

import '../../../styles/items/models/Tag.scss'

const Tag = (props) => {
    const [tag, setTag] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const target = useMemo(() => targetMap(['panel-right', 'tag']), []) 
    const display = props.display ?? {
        sideAction: false, 
        type: 'mini-list'
    }
    const utilsTag = {
        assignmentID: props.assignmentID ?? null,
        goalID: props.goalID ?? null,
        getAll: props.getAll ?? false
    }

    const handleGetTag = async (assignmentID, goalID, getAll) => {
        let tagGetted = []
        
        if (goalID) {
            tagGetted = tagAction.getTagOnGoal({ goalID: goalID})
        } else if (assignmentID) {

        } else if (getAll) {
            tagGetted = tagAction.getTag()
        }

        return tagGetted
    }

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const fetched = await handleGetTag(utilsTag.assignmentID, utilsTag.goalID, utilsTag.getAll)
                setTag(fetched)

            } catch (error) {
                setErro(`Failed to load tag: ${error.message}`)
            }
        }
        fetchTag()
    }, [])

    const deleteTag = async (id) => {
        try {
            await tagAction.deleteTag(id)
            setTag((prevTag) => prevTag.filter((tag) => tag.id !== id))
        } catch (error) {
            setErro(`Failed to delete tag: ${erro.message}`)
        }
    }

    const editTag = useCallback(async (id) => {
        try {
            const fetched = await tagAction.getTag(id)
            setSelectModel(fetched.id)
        } catch (error) {
            setErro(`Failed to edit this tag: ${erro.message}`)
        }
    }, [setSelectModel])

    const handleTagClick = useCallback(
        (id, e) => {
            const isSelectableModel = props.selectableModel ?? false
            if (isSelectableModel) { 
                e.stopPropagation()
                return insertModelComponent(props, 'tag', e)
            }

            setSelectModel(id)
            toggleVisibility(target, e)
        },
        [setSelectModel, toggleVisibility, target]
    )

    return (
        tag.map(tag => ( 
            <div className={`tag ${display.type}`} id={tag.id} key={tag.id} onClick={(e) => handleTagClick(tag.id, e)}>
                {
                    display.type === 'card' ?
                    <div>
                        <div className='head'>
                            <label className='line-info'><i className='icon-st fa-solid fa-tag' style={{backgroundColor: tag.color}}></i><label>{tag.name}</label></label>
                        </div>
                        <div className='body'></div>
                    </div>
                    :
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-tag' style={{backgroundColor: tag.color}}></i><label>{tag.name}</label></label>
                    </div>
                }
                {
                    display.sideAction && 
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editTag(tag.id)} target={targetMap(['panel-center', 'tag'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-tag' iconFa='fa-regular fa-pen-to-square'/>
                        <ButtonAction onClick={() => deleteTag(tag.id)} target={targetMap(null)} classBtn='remove-tag' iconFa='fa-regular fa-trash-can'/>
                    </div>
                }
            </div>
        ))
    )
}

export default Tag