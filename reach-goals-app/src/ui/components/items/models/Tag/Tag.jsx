import { useCallback, useContext, useEffect, useState } from 'react'

import { useTagModel } from '../../../../../provider/model/TagModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { targetMap } from '../../../../../utils/mapping/mappingUtils.js'
import { filterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Tag/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)
    const [activeModelSource, setActiveModelSource] = useState([])

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { data, loading, refetch, remove } = useTagModel()

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false

    const filterGetTag = {
        ...filterModelMap,
        type: 'tag',
        source: props.typeDataSource ?? 'core',
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
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = activeModelSource.find(m => m.id === id)

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
        }
    }

    useEffect(() => {
        const fromModelSource = props.fromModelSource?.tag 

        if (fromModelSource && fromModelSource.length) setActiveModelSource(fromModelSource)
        else setActiveModelSource(data[filterGetTag.source])
    }, [data])

    useEffect(() => {
        refetch(filterGetTag)
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
            activeModelSource?.length ? <CardItem type={'tag'} model={activeModelSource} clickFunction={clickEvents} display={display} /> : null
    )
}

export default Tag