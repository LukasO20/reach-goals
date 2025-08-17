import { useCallback, useContext, useEffect, useState } from 'react'

import { useTagModel } from '../../../../provider/model/TagModelProvider.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap } from '../../../../utils/mapping/mappingUtils.js'
import { filterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)
    const [dataSource, setDataSource] = useState([])

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { data, loading, refetch, remove } = useTagModel()
    
    const modelSource = props.modelRef?.tag

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false

    const filterGetTag = {
        ...filterModelMap,
        type: 'tag',
        tagsRelation: props.goalID ?? props.assignmentID ?? null,
        tagsNotRelation: {
            notRelationID: props.notRelationID ?? null,
            notRelationModel: props.notRelationModel ?? null
        },
        tagSomeID: props.tagSomeID ?? null
    }

    const deleteTag = async (id) => {
        await remove(id)
        refetch(filterGetTag)
    }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel])

    const tagClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = dataSource.find(m => m.id === id)

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
            //Tem que remover o elemento do DOM
        }
    }

    useEffect(() => {
        if (modelSource && modelSource.length) setDataSource(modelSource)
        else setDataSource(data)
    }, [modelSource, data])

    useEffect(() => {
        if (!modelSource || !modelSource.length) refetch(filterGetTag)
    }, [])

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    return (
        loading && data.length === 0 ?
            <p>Loading...</p>
            :
            <CardItem type={'tag'} model={dataSource} clickFunction={clickEvents} display={display} />
    )
}

export default Tag