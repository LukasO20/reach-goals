import { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import CardItem from '../elements/CardItem/CardItem.jsx'

const ModelCopy = ({ displayRef, region }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model, removeFromTransportModel, updateSubmitModel } = useContext(ManageModelContext)

    const display = displayRef ?? {
        sideAction: true,
        type: 'mini-list' //Right now, is necessary only one style
    }

    useEffect(() => {
        setCopyModel(model.transportModel[region] || [])
    }, [model.transportModel])

    const removeElDOMClick = ({ id, tagID }, type) => {
        removeFromTransportModel({ id: id ?? tagID, type: type })

        if (!type) { return console.error('No type provided for model copy delete action. Send a goal, assignment or tag type') }

        switch (type) {
            case 'goal':
                updateSubmitModel({ keyObject: 'goalID', value: null, action: 'remove' })
                break
            case 'assignment':
                updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
                break
            case 'tag':
                updateSubmitModel({ keyObject: 'tags', value: { tagID: tagID }, type: 'array', action: 'remove' })
        }
    }

    const clickEvents = {
        card: () => { },
        aux: removeElDOMClick
    }

    return <CardItem type={modelCopy[0]?.type} model={modelCopy} clickFunction={clickEvents} display={display} />
}

export default ModelCopy