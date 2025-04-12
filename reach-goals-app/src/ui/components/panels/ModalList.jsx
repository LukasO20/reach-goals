import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
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
    const complement = props?.complement //This is a complement modal (goal is a complement of assingment and vice versa)
    const typeModalList = props?.type
    const externalFunction = props?.exFunction

    return (
        <div className='container-list-modal'>
            <div className='head'>
                <h3>{title}</h3>
                <ButtonAction modalList={modalListMap(false)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                {complement === 'goal' ? <Goal selectableModel={true} /> : <Assignment selectableModel={true} action={{ setForm: true }} exFunction={externalFunction}/>}
            </div>
        </div>
    )
}

export default ModalList