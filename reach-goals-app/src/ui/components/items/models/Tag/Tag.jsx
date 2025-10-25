import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { targetMap, filterGetModelMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Tag/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFormModel, updateFilterModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { data, loading, remove, refetch } = useTagProvider()
    const { update } = useTitle()

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const sourceForm = props.sourceForm
    const isSelectableModel = props.selectableModel ?? false

    const filterGetTag = useMemo(() => (
        filterGetModelMap(props, 'tag', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.tagNotRelationGoal,
        props.tagNotRelationAssignment,
        props.notRelationModel,
        props.tagSomeID
    ])

    //First will be checked form source to render a tag, if not, will be render according tag filter
    const tagSourceAuxiliary = sourceForm?.tags.map(item => {
        return item.tag
    })
    const renderModel = tagSourceAuxiliary ?? model.dataModel.tag[filterGetTag.source].data

    const deleteTag = async (id) => {
        remove(id)
        update({ toast: `tag was deleted` })
    }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel])

    const tagClick = ({ id, name, color }, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = renderModel.find(m => m.id === id)

            addToTransportModel({ ...selected, type: 'tag' })
            return updateFormModel({
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
            updateFormModel({ keyObject: 'tags', value: { tagID: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        if (filterGetTag["Without key"] === "Without value") return
        refetch(updateFilterModel(filterGetTag, 'tag'))
    }, [])

    useEffect(() => {
        if (filterGetTag["Without key"] === "Without value") return

        const currentFilter = model.filter.tag
        if (currentFilter.source === 'core' || currentFilter.source === 'support') {
            updateDataModel(data, 'tag', currentFilter.source)
        }
    }, [data])

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    return (
        loading && !renderModel?.length ?
            <p>Loading...</p>
            :
            renderModel?.length ? <CardItem type={'tag'} model={renderModel} clickFunction={clickEvents} display={display} /> : null
    )
}

export default Tag