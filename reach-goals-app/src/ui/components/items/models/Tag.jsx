import { useCallback, useContext, useEffect, useState } from 'react'

import { useGetModel } from '../../../../hook/useGetModel.js'
import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap } from '../../../../utils/mappingUtils.js'
import { requestPropsGetModel } from '../../../../utils/mappingUtilsHook.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Tag.scss'

const Tag = (props) => {
    const [tag, setTag] = useState([])
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false

    const requestPropsTag = {
        ...requestPropsGetModel,
        type: 'tag',
        tagsRelation: props.goalID ?? props.assignmentID ?? null,
        tagsNotRelation: {
            notRelationID: props.notRelationID ?? null,
            notRelationModel: props.notRelationModel ?? null
        },
        tagSomeID: props.tagSomeID ?? null
    }

    const { params: getParams, data: getData } = useGetModel({ requestProps: requestPropsTag })

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

    const tagClick = (id, e) => {
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

    const removeElDOMClick = (id, e) => {
        if (id) {
            e.stopPropagation()
            updateSubmitModel({ keyObject: 'tags', value: { tagID: id }, type: 'array', action: 'remove' })
            setTag((prevTag) => prevTag.filter((tag) => tag.id !== id))
        }
    }

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    //console.log('TAG LOADED - ', tag)

    return (
        <CardItem type={'tag'} model={tag} clickFunction={clickEvents} display={display} />
    )
}

export default Tag