import { useCallback, useContext, useEffect, useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'
import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Tag/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { panel: { data }, remove } = useTagProvider()
    const { update } = useTitle()

    const target = targetMap(['panel-right', 'tag'])

    const display = props.display
    const sourceForm = props.sourceForm
    const isSelectableModel = props.selectableModel ?? false

    const currentScope = model.filter.tag.scope
    const currentFilter = model.filter.tag[currentScope]
    //First will be checked form source to render a tag, if not, will be render according tag filter
    const tagSourceAuxiliary = sourceForm?.tags.map(item => {
        return item.tag
    })
    const render = tagSourceAuxiliary ?? model.dataModel.tag[currentFilter.source]?.data ?? data

    const deleteTag = async (id) => {
        remove(id)
        update({ toast: `tag was deleted` })
    }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel])

    const tagClick = (tag, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = model.dataModel.tag.support.data.find(m => m.id === tag.id)

            addToTransportModel({ ...selected, type: 'tag' })
            return updateFormModel({
                keyObject: 'tags',
                value: {
                    tagID: tag.id,
                    tag: { id: tag.id, name: tag.name, color: tag.color }
                },
                type: 'array'
            })
        }

        setModel({ ...model, mainModelID: tag.id })
        toggleVisibility(target, e)
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            updateFormModel({ keyObject: 'tags', value: { tagID: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
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
        render?.length ?
            <CardItem type={'tag'}
                model={render}
                clickFunction={clickEvents}
                display={display} />
            : null
    )
}

export default Tag