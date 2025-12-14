import { useCallback, useContext, useEffect, useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardMini from '../../elements/CardMini/CardMini.jsx'

import '../Tag/Tag.scss'

const Tag = (props) => {
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { panel: { data }, remove } = useTagProvider()

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
    const renderCardMini = tagSourceAuxiliary ?? model.dataModel.tag[currentFilter.source]?.data ?? data ?? []

    const deleteTag = async (id) => { remove(id) }

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

    const cardRender = <CardMini
        type='tag'
        model={renderCardMini}
        clickFunction={clickEvents}
        display={display}
    />

    return cardRender
}

export default Tag