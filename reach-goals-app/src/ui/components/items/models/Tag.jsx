import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { insertModelComponent } from '../../../utils/layout/uiLayout'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils'
import { useGetModel } from '../../../../hook/useGetModel'

import ButtonAction from '../elements/ButtonAction'
import * as tagAction from '../../../../provider/tag/tagAction'

import '../../../styles/items/models/Tag.scss'

const Tag = (props) => {
    const [tag, setTag] = useState([])
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)

    const target = targetMap(['panel-right', 'tag'])
    const display = props.display ?? {
        sideAction: false,
        type: 'mini-list'
    }

    const [requestPropsTag, setRequestPropsTag] = useState({
        type: 'tag',
        tagsRelation: props.goalID ?? props.assignmentID ?? null,
        tagsNotRelation: {
            notRelationID: props.notRelationID ?? null,
            notRelationModel: props.notRelationModel ?? null
        },
        tagSomeID: props.tagSomeID ?? null
    })

    const { params, data } = useGetModel(requestPropsTag)

    const getTag = async () => {
        try { setTag(data) }
        catch (error) { setErro(`Failed to load tag: ${error.message}`) }
    }

    useEffect(() => { getTag() }, [data])

    const deleteTag = async (id) => {
        try {
            await tagAction.deleteTag(id)
            setTag((prevTag) => prevTag.filter((tag) => tag.id !== id))
        } catch (error) {
            setErro(`Failed to delete tag: ${erro.message}`)
        }
    }

    const editTag = useCallback((id) => {
        try {
            setSelectModel(id)
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

    console.log('TAG LOADED - ', tag)

    return (
        tag.map(tag => (
            <div className={`tag ${display.type}`} id={tag.id} key={tag.id} onClick={(e) => handleTagClick(tag.id, e)}>
                {
                    display.type === 'card' ?
                        <div>
                            <div className='head'>
                                <label className='line-info'><i className='icon-st fa-solid fa-tag' style={{ backgroundColor: tag.color }}></i><label>{tag.name}</label></label>
                            </div>
                            <div className='body'></div>
                        </div>
                        :
                        <div className='head'>
                            <label className='line-info'><i className='icon-st fa-solid fa-tag' style={{ backgroundColor: tag.color }}></i><label>{tag.name}</label></label>
                        </div>
                }
                {
                    display.sideAction &&
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editTag(tag.id)} target={targetMap(['panel-center', 'tag'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-tag' iconFa='fa-regular fa-pen-to-square' />
                        <ButtonAction onClick={() => deleteTag(tag.id)} target={targetMap(null)} classBtn='remove-tag' iconFa='fa-regular fa-trash-can' />
                    </div>
                }
            </div>
        ))
    )
}

export default Tag