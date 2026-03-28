import { useState, useEffect } from 'react'

import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'

import { removeFromSelectedModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import CardMini from '../elements/CardMini/CardMini.jsx'

const ModelCopy = ({ propsReference, region }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model, removeFromSelectedModel, updateFormModel } = useManageModel()

    useEffect(() => {
        setCopyModel(model.selectedModel[region] || [])
    }, [model.selectedModel, setCopyModel, region])

    const removeElDOMClick = ({ id, tagID }, type) => {
        const dataRemoveFromSelectedModel = removeFromSelectedModelMap({ id: id ?? tagID, type })
        removeFromSelectedModel(dataRemoveFromSelectedModel)

        if (!type) { return console.error('No type provided for model copy delete action. Send a goal, assignment or tag type') }

        switch (type) {
            case 'goal':
                return updateFormModel({ keyObject: 'goalID', value: null, action: 'remove' })
            case 'assignment':
                return updateFormModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
            case 'tag':
                return updateFormModel({ keyObject: 'tags', value: { tagID: tagID }, type: 'array', action: 'remove' })
            default:
                return null
        }
    }

    const clickEvents = {
        card: () => { },
        aux: removeElDOMClick
    }

    return <CardMini type={region} model={modelCopy} clickFunction={clickEvents} {...propsReference} />
}

export default ModelCopy