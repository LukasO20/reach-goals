import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { Goal } from '../items/models/Goal'
import { Assignment } from '../items/models/Assignment'

const getGoalList = () => {
    return 
} 

const getAssignmentList = () => {
    return
} 

const ModalList = (props) => {
    const typeList = props

    return (
        <div className='container-list-modal'>
            <div className='head'></div>
            <div className='body'>
                {console.log(typeList)}
            </div>
        </div>
    )
}

export default ModalList