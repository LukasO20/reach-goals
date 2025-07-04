import { useCallback, useContext, useEffect, useState } from 'react'

import { useGetModel } from '../../../../hook/useGetModel.js'
import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils.js'

import ButtonAction from '../elements/ButtonAction.jsx'

import '../../../styles/items/models/Tag.scss'

const Tag = (props) => {
    const [tag, setTag] = useState([])
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)

    const target = targetMap(['panel-right', 'tag'])
    const isSelectableModel = props.selectableModel ?? false
    const display = props.display ?? {
        sideAction: false,
        type: 'mini-list'
    }

    const requestPropsTag = {
        type: 'tag',
        tagsRelation: props.goalID ?? props.assignmentID ?? null,
        tagsNotRelation: {
            notRelationID: props.notRelationID ?? null,
            notRelationModel: props.notRelationModel ?? null
        },
        tagSomeID: props.tagSomeID ?? null
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsTag)

    const getTag = async () => {
        try { setTag(getData) }
        catch (error) { setErro(`Failed to load tag: ${error.message}`) }
    }

    useEffect(() => { getTag() }, [getData])

    const { data: deleteData, deleteModel } = useDeleteModel({})

    const deleteTag = async (id) => {
        deleteModel({ type: 'tag', tagID: id })
        setTag((prevTag) => prevTag.filter((tag) => tag.id !== id))
    }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel])

    const removeTagDOMClick = (id, e) => {
        if (id) {
            e.stopPropagation()
            updateSubmitModel({ keyObject: 'tags', value: { tagID: id }, type: 'array', action: 'remove' })
            setTag((prevTag) => prevTag.filter((tag) => tag.id !== id))
        }
    }

    const tagDOMClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = tag.find(m => m.id === id)
            if (model.transportModel.some(item => item.id === selected.id)) return

            addToTransportModel({ ...selected, type: 'tag' })
            return updateSubmitModel({ keyObject: 'tags', value: { tagID: id }, type: 'array' })
        }

        setModel({ ...model, mainModelID: id })
        toggleVisibility(target, e)
    }

    console.log('TAG LOADED - ', tag)

    return (
        tag.map(tag => (
            <div className={`tag ${display.type}`} id={tag.id} key={tag.id} onClick={(e) => tagDOMClick(tag.id, e)}>
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
                        {
                            display.type === "mini-list" ?
                                <ButtonAction onClick={({ e }) => removeTagDOMClick(tag.id, e)} classBtn='remove-tag-dom' iconFa='fa-solid fa-xmark' />
                                :
                                <>
                                    <ButtonAction onClick={() => editTag(tag.id)} target={targetMap(['panel-center', 'tag'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-tag' iconFa='fa-regular fa-pen-to-square' />
                                    <ButtonAction onClick={() => deleteTag(tag.id)} target={targetMap(null)} classBtn='remove-tag' iconFa='fa-regular fa-trash-can' />
                                </>
                        }
                    </div>
                }
            </div>
        ))
    )
}

export default Tag