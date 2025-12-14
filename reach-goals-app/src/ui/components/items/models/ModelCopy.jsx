import { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import Card from '../elements/Card/Card.jsx'

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
                updateFormModel({ keyObject: 'goalID', value: null, action: 'remove' })
                break
            case 'assignment':
                updateFormModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
                break
            case 'tag':
                updateFormModel({ keyObject: 'tags', value: { tagID: tagID }, type: 'array', action: 'remove' })
        }
    }

    const clickEvents = {
        card: () => { },
        aux: removeElDOMClick
    }

    return <Card type={modelCopy[0]?.type} model={modelCopy} clickFunction={clickEvents} display={display} />
}

export default ModelCopy