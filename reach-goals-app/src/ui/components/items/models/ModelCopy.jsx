import { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'

import ButtonAction from '../elements/ButtonAction'

const iconLayoutMap = {
    goal: 'fa-solid fa-bullseye',
    assignment: 'fa-solid fa-list-check',
    tag: 'fa-solid fa-tag',
}

const ModelCopy = ({ type, displayRef }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model, removeFromTransportModel, updateSubmitModel } = useContext(ManageModelContext)

    const icon = iconLayoutMap[type] || 'fa-solid fa-triangle-exclamation'
    const display = displayRef ?? {
        sideAction: true,
        type: 'mini-list' //Right now, is necessary only one style
    }

    useEffect(() => {
        setCopyModel(model.transportModel)
    }, [model.transportModel])

    const handleModelCopyClick = (modelID, action, type) => {
        switch (action) {
            case 'delete': //Right now, only delete action is available
                removeFromTransportModel(modelID)

                if (!type) { return console.error('No type provided for model copy delete action') }
                switch (type) {
                    case 'goal':
                        updateSubmitModel({ keyObject: 'goalID', value: null, action: 'remove'})
                        break
                    case 'assignment':
                        break
                    case 'tag':
                        updateSubmitModel({ keyObject: 'tags', value: { tagID: modelID }, type: 'array', action: 'remove' })
                }
                break
        }
    }

    console.log('MODEL COPY - ', model)

    return modelCopy.map(model => (
        <div className={`${type} ${display.type}`} id={model.id} key={model.id} /*onClick={(e) => handleGoalClick(goal.id, e)}*/>
            {
                display.type === 'card' ? ''
                    :
                    <div className='head'>
                        <label className='line-info'><i className={`icon-st ${icon}`}></i><label>{model.name}</label></label>
                    </div>
            }
            {
                display.sideAction &&
                <div className='side-actions'>
                    <ButtonAction classBtn={`remove-${type}`} iconFa='fa-solid fa-xmark' onClick={() => { handleModelCopyClick(model.id, 'delete') }} />
                </div>
            }
        </div>
    ))
}

export default ModelCopy