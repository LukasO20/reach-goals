import { useCallback } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'
import { useManageModel } from '../../../../../provider/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { addToTransportModelMap, updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../../elements/CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import '../Tag/Tag.scss'

const Tag = ({ display, source = [], selectableModel = false }) => {
    const { toggleVisibility } = useVisibility()
    const { model, setModel, updateFormModel, addToTransportModel } = useManageModel()
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
            const dataAddToTransportModel = addToTransportModelMap({
                id: selected.id,
                name: selected.name,
                type: 'tag',
                color: selected.color
            })

            addToTransportModel(dataAddToTransportModel)
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

Tag.propTypes = {
    display: PropTypes.exact({
        type: PropTypes.arrayOf(
            PropTypes.oneOf(['card', 'card-mini'])
        ).isRequired,
        actions: PropTypes.arrayOf(
            PropTypes.oneOf(['edit', 'delete', 'details', 'remove'])
        )
    }).isRequired,
    source: PropTypes.oneOfType([
        PropTypes.shape({
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    tagID: PropTypes.number,
                    tag: PropTypes.shape({
                        id: PropTypes.number,
                        name: PropTypes.string,
                        color: PropTypes.string
                    })
                })
            )
        }),
        PropTypes.array
    ]),
    selectableModel: PropTypes.bool
}

export default Tag