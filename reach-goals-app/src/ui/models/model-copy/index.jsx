import { useState, useEffect } from 'react'

import { useManageModel } from '../../../provider/model/manage-model-provider'

import { removeFromSelectedModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../../elements/card-mini'

const ModelCopy = ({ propsReference, region }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model, removeFromSelectedModel, updateActiveModel } = useManageModel()

    useEffect(() => {
        setCopyModel(model.selectedModel[region] || [])
    }, [model.selectedModel, setCopyModel, region])

    const removeElDOMClick = ({ id, tagID }, type) => {
        const dataRemoveFromSelectedModel = removeFromSelectedModelMap({ id: id ?? tagID, type })
        removeFromSelectedModel(dataRemoveFromSelectedModel)

        if (!type) { return console.error('No type provided for model copy delete action. Send a goal, assignment or tag type') }

        switch (type) {
            case 'goal':
                return updateActiveModel({ keyObject: 'goalID', value: null, action: 'remove' })
            case 'assignment':
                return updateActiveModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
            case 'tag':
                return updateActiveModel({ keyObject: 'tags', value: { tagID: tagID }, type: 'array', action: 'remove' })
            default:
                return null
        }
    }

    const clickEvents = {
        card: () => { },
        aux: removeElDOMClick
    }

    return modelCopy.map((item, index) => (
        <CardMini
            type={region}
            key={index}
            item={item}
            clickFunction={clickEvents}
            {...propsReference}
        />
    ))
}

export default ModelCopy