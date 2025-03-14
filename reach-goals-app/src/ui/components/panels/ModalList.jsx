import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { Goal } from '../items/models/Goal'
import { Assignment } from '../items/models/Assignment'
import ButtonAction from '../items/elements/ButtonAction'

const getGoalList = () => {
    return 
} 

const getAssignmentList = () => {
    return
} 

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const ModalList = (props) => {
    const title = props?.title

    return (
        <div className='container-list-modal'>
            <div className='head'>
                <h3>{title}</h3>
                <ButtonAction modalList={modalListMap(false)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                
            </div>
        </div>
    )
}

export default ModalList