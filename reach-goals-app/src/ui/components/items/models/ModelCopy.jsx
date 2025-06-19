import { useState, useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'

import ButtonAction from '../elements/ButtonAction'

const iconLayoutMap = {
    goal: 'fa-solid fa-bullseye',
    assignment: 'fa-solid fa-list-check'
}

const removeModelCopy = (modelID) => {

}

const ModelCopy = ({ type, displayRef }) => {
    const [modelCopy, setCopyModel] = useState([])
    const { model } = useContext(ManageModelContext)

    const icon = iconLayoutMap[type] || 'fa-solid fa-triangle-exclamation'
    const display = displayRef ?? {
        sideAction: true,
        type: 'mini-list' //Right now, is necessary only one style
    }

    useEffect(( ) => {


    }, [model.transportModel])

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
                    <ButtonAction classBtn={`remove-${type}`} iconFa='fa-solid fa-xmark' />
                </div>
            }
        </div>
    ))
}

export default ModelCopy