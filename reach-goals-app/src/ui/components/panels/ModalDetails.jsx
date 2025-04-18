import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import * as goalAction from '../../../provider/goal/goalAction'

import ButtonAction from '../../components/items/elements/ButtonAction'
import Assignment from '../items/models/Assignment'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const ModalDetails = () => {
    const [error, setError] = useState(null)
    const [goal, setGoal] = useState({
        name: '',
        description: '',
        end: ''
    })

    const { selectModel } = useContext(ManageModelContext)

    useEffect(() => {
        const loadGoal = async (id) => {
            if (id === null) { return }

            try {
                const getGoal = await goalAction.getGoal(id)
                setGoal(getGoal)
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }
        } 

        loadGoal(selectModel)
    }, [selectModel])

    return ReactDOM.createPortal (
        <div className='container-modaldetails aside-content'>
            <div className='header'>
                <h2>{goal.name}</h2>
                <h4>{goal.end}</h4>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                {
                    goal.description &&
                    <div>
                        {goal.description}
                    </div>
                }
                {
                    <div className='modaldetails assignment-list'>
                        <div className='header-assignment-list'>
                            <i className="icon-st fa-solid fa-list-check"></i>
                            <h4>Assignments</h4>
                        </div>
                        <div className='body-assignment-list'>
                            <Assignment/>
                        </div>
                    </div>
                }
            </div>
            <Outlet/>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default ModalDetails