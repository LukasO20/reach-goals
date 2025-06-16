import { useEffect, useState } from 'react'

import { useGetModel } from '../../../../hook/useGetModel'

import ButtonAction from '../elements/ButtonAction'

const iconLayoutMap = {
    goal: 'fa-solid fa-bullseye',
    assignment: 'fa-solid fa-list-check'
}

const ModelCopy = ({ typeModel, modelID, displayRef, referenceModel }) => {
    const [models, setModels] = useState([])

    const requestPropsGetModel = {
        type: typeModel ?? null,
        goalSomeID: modelID ?? null,
    }

    const display = displayRef ?? {
        sideAction: true,
        type: 'mini-list' //Right now, is necessary only one style
    }

    const icon = iconLayoutMap[requestPropsGetModel.type] || 'fa-solid fa-triangle-exclamation'

    const { params: getParams, data: getData } = useGetModel(requestPropsGetModel)
    useEffect(() => {
        if (modelID && !models.some(m => m.id === modelID)) {
            setModels([...models, ...getData])
        }
    }, [getData])


    console.log('ModelCopy: ', models, getData)

    switch (referenceModel) {
        case 'tag':
            return models.map(model => (
                <div className={`${requestPropsGetModel.type} ${display.type}`} id={model.id} key={model.id} /*onClick={(e) => handleGoalClick(goal.id, e)}*/>
                    {
                        display.type === 'card' ? 
                            ''
                            :
                            <div className='head'>
                                <label className='line-info'><i className={`icon-st ${icon}`}></i><label>{model.name}</label></label>
                            </div>
                    }
                    {
                        display.sideAction &&
                        <div className='side-actions'>
                            <ButtonAction classBtn={`remove-${requestPropsGetModel.type}`} iconFa='fa-solid fa-xmark' />
                        </div>
                    }
                </div>
            ))
        default:
            return null
    }
}

export default ModelCopy