import { useCallback } from 'react'

import { useTagProvider } from '../../../../provider/model/tag-model-provider'
import { useManageModel } from '../../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../../provider/ui/visibility-provider'

import { visibilityMap, displayModesMap } from '../../../../utils/mapping/mappingUtils.js'
import { addToSelectedModelMap, updateActiveModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../../elements/card-mini'

/** @typedef {import('./types.js').TagProps} Props */

/**
 * @param {Props} props
 */
const Tag = ({ display = displayModesMap, source, selectableModel }) => {
    const { toggleVisibility } = useVisibility()
    const { model, setModel, updateActiveModel, addToSelectedModel } = useManageModel()
    const { remove, removeSuccess, removingVariables } = useTagProvider()

    const target = visibilityMap(['panel-right', 'tag'])

    const sourceData = source.tags ? source.tags.map(item => (item.tag)) : source

    const sourceDataFiltered = sourceData.filter(item =>
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
            const dataUpdateActiveModelMap = updateActiveModelMap({
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
            return updateActiveModel(dataUpdateActiveModelMap)
        }

        setModel({ ...model, mainModelID: tag.id })
        toggleVisibility(target, e)
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            const dataUpdateActiveModelMap = updateActiveModelMap({
                keyObject: 'tags',
                value: { tagID: id },
                type: 'array',
                action: 'remove'
            })
            updateActiveModel(dataUpdateActiveModelMap)
        }
    }

    const clickEvents = {
        card: tagClick,
        edit: editTag,
        delete: deleteTag,
        aux: removeElDOMClick
    }

    return sourceDataFiltered.map((item, index) => (
        <CardMini
            type='tag'
            item={item}
            clickFunction={clickEvents}
            display={display}
            key={index}
        />
    ))
}

export default Tag