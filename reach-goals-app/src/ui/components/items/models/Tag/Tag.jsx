import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useTagModel } from '../../../../../provider/model/TagModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { targetMap, filterGetModel } from '../../../../../utils/mapping/mappingUtils.js'
import { filterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Tag/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)
    const [activeModelSource, setActiveModelSource] = useState([])

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { data, saved, loading, refetch, remove } = useTagModel()

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false

    const filterGetTag = useMemo(() => (
        filterGetModel(props, 'tag', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.tagNotRelationGoal,
        props.tagNotRelationAssignment,
        props.notRelationModel,
        props.tagSomeID
    ])

    const deleteTag = async (id) => {
        remove(id).then(() => refetch(filterGetTag))
    }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel])

    const tagClick = ({ id, name, color }, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = activeModelSource.find(m => m.id === id)

            addToTransportModel({ ...selected, type: 'tag' })
            return updateSubmitModel({ 
                keyObject: 'tags', 
                value: { 
                    tagID: id, 
                    tag: { id: id, name: name, color: color }
                },
                type: 'array' 
            })
        }

        setModel({ ...model, mainModelID: id })
        toggleVisibility(target, e)
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            updateSubmitModel({ keyObject: 'tags', value: { tagID: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        if (typeof saved.id === 'number') return refetch(filterGetTag)
        if (filterGetTag["Without key"] === "Without value") return
        
        refetch(filterGetTag)
    }, [filterGetTag, saved])

    useEffect(() => {
        //When form send data, it will be considered as source
        const formSource = props?.sourceForm?.tags.map(tag => tag.tag)
        const tagSource = data[filterGetTag.source]

        return setActiveModelSource
            (
                Array.isArray(formSource) ?
                    formSource.length ? formSource : []
                    : tagSource
            )
    }, [data, props.sourceForm])

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    return (
        loading && activeModelSource.length === 0 ?
            <p>Loading...</p>
            :
            activeModelSource?.length ? <CardItem type={'tag'} model={activeModelSource} clickFunction={clickEvents} display={display} /> : null
    )
}

export default Tag