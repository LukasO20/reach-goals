import React from 'react'
import Goal from '../items/models/Goal'
import Assignment from '../items/models/Assignment'
import ButtonAction from '../items/elements/ButtonAction'

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const ModalList = (props) => {
    const title = props?.title
    const complement = props?.complement //This is a complement value (goal is a complement of assingment and vice versa)
    const typeModalList = props?.type
    const externalFunction = props?.exFunction
    const externalID = props?.externalID

    return (
        <div className='container-list-modal'>
            <div className='head'>
                <h3>{title}</h3>
                <ButtonAction modalList={modalListMap(false)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                {complement === 'goal' ? <Goal selectableModel={true} idAssignment={externalID} action={{ setForm: true }} exFunction={externalFunction} /> 
                : <Assignment selectableModel={true} action={{ setForm: true }} unfocused={true} exFunction={externalFunction}/>}
            </div>
        </div>
    )
}

export default ModalList