import { useCallback } from 'react'

import { useTagProvider } from '../../../../../provider/model/tag-model-provider.jsx'
import { useManageModel } from '../../../../../provider/model/manage-model-provider.jsx'
import { useVisibility } from '../../../../../provider/ui/visibility-provider.jsx'

import { visibilityMap, displayModesMap } from '../../../../../utils/mapping/mappingUtils.js'
import { addToSelectedModelMap, updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../../elements/card-mini' 

/** @typedef {import('./types.js').TagProps} Props */

/**
 * @param {Props} props
 */
const Tag = ({ display = displayModesMap, source, selectableModel }) => {
    const { toggleVisibility } = useVisibility()
    const { model, setModel, updateFormModel, addToSelectedModel } = useManageModel()
    const { remove, removeSuccess, removingVariables } = useTagProvider()

    const target = visibilityMap(['panel-right', 'tag'])

    const sourceData = source.tags ? source.tags.map(item => (item.tag)) : source

    const renderCardMini = sourceData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
    )

    const deleteTag = async (id) => { remove(id) }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { console.error(`Failed to edit this tag: ${error.message}`) }
    }, [setModel, model])

    const tagClick = (tag, e) => {
        e.stopPropagation()

        if (selectableModel) {
            const selected = model.dataModel.tag.support.data.find(m => m.id === tag.id)
            const dataUpdateFormModelMap = updateFormModelMap({
                keyObject: 'tags',
                value: { tagID: tag.id, tag: { id: tag.id, name: tag.name, color: tag.color } },
                type: 'array',
                action: 'add'
            })
            const dataAddToSelectedModel = addToSelectedModelMap({
                id: selected.id,
                name: selected.name,
                type: 'tag',
                color: selected.color
            })

            addToSelectedModel(dataAddToSelectedModel)
            return updateFormModel(dataUpdateFormModelMap)
        }

        setModel({ ...model, mainModelID: tag.id })
        toggleVisibility(target, e)
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            const dataUpdateFormModelMap = updateFormModelMap({
                keyObject: 'tags',
                value: { tagID: id },
                type: 'array',
                action: 'remove'
            })
            updateFormModel(dataUpdateFormModelMap)
        }
    }

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    return <CardMini type='tag' model={renderCardMini} clickFunction={clickEvents} display={display} />
}

export default Tag