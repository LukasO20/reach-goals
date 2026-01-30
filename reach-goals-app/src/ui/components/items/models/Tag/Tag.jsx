import { useCallback, useContext, useEffect, useState } from 'react'

import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { addToTransportModelMap, updateDataModelMap, updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../../elements/CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import '../Tag/Tag.scss'

const Tag = ({ display, sourceForm, selectableModel = false }) => {
    const [erro, setErro] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { modal: { data }, remove, removeSuccess, removingVariables } = useTagProvider()

    const target = visibilityMap(['panel-right', 'tag'])

    const currentScope = model.filter.tag.scope
    const currentFilter = model.filter.tag[currentScope]

    //First will be checked form source to render a tag, if not, will be render according tag filter
    const tagSourceAuxiliary = sourceForm?.tags.map(item => {
        return item.tag
    })

    const baseData =
        tagSourceAuxiliary ??
        model.dataModel.tag[currentFilter.source]?.data ??
        data ??
        []

    const renderCardMini = baseData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
    )

    const deleteTag = async (id) => { remove(id) }

    const editTag = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'tag' }) }
        catch (error) { setErro(`Failed to edit this tag: ${erro.message}`) }
    }, [setModel, erro.message, model])

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
            const dataUpdateFormModelMap = updateFormModelMap('tags', { tagID: id }, 'array', 'remove')
            updateFormModel(dataUpdateFormModelMap)
        }
    }

    useEffect(() => {
        if ((currentFilter.source === 'core' || currentFilter.source === 'support') && Array.isArray(data)) {
            const dataUpdateDataModel = updateDataModelMap({
                data: data,
                type: 'tag',
                scope: currentFilter.source
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [data, updateDataModel, currentFilter.source])

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
    sourceForm: PropTypes.shape({
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                tagID: PropTypes.number.isRequired,
                tag: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    color: PropTypes.string.isRequired
                }).isRequired
            })
        )
    }),
    selectableModel: PropTypes.bool
}

export default Tag