import { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import CardMini from '../elements/CardMini/CardMini.jsx'

const ModelCopy = ({ displayRef, region }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model, removeFromTransportModel, updateFormModel } = useContext(ManageModelContext)

    const display = displayRef ?? {
        sideAction: true,
        type: 'card-mini'
    }

    useEffect(() => {
        setCopyModel(model.transportModel[region] || [])
    }, [model.transportModel])

    const removeElDOMClick = ({ id, tagID }, type) => {
        removeFromTransportModel({ id: id ?? tagID, type: type })

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

    return <CardMini type={region} model={modelCopy} clickFunction={clickEvents} display={display} />
}

export default ModelCopy