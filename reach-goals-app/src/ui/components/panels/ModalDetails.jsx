import { useContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { ManageModelContext } from '../../../provider/ManageModelProvider'

import * as goalAction from '../../../provider/goal/goalAction'
import * as assignmentAction from '../../../provider/assignment/assignmentAction'
import { targetMap } from '../../../utils/mappingUtils'

import ButtonAction from '../../components/items/elements/ButtonAction'
import Assignment from '../items/models/Assignment'
import ModalDetailsSection from '../items/modals/modal_details/ModalDetailsSection'

const ModalDetails = (props) => {
    const [error, setError] = useState(null)
    const [goal, setGoal] = useState({
        name: '',
        description: '',
        end: '',
    })
    const [assignment, setAssignment] = useState({
        name: '',
        description: '',
        end: ''
    })

    const { selectModel } = useContext(ManageModelContext)
    const typeDetail = props?.type

    //console.log()
    useEffect(() => {
        const loadGoal = async (id) => {
            if (id === null) { return }

            try {
                typeDetail === 'goal' ?
                setGoal(await goalAction.getGoal(id)) : setAssignment(await assignmentAction.getAssignment(id))
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }
        } 

        loadGoal(selectModel)
    }, [selectModel])

    return (
        <div className='container-modaldetails aside-content'>
            <ModalDetailsSection />
            <div className='header'>
                <h2>{goal.name ?? assignment.name}</h2>
                <h4>{goal.end ?? assignment.end}</h4>
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
        </div>
    )
}

export default ModalDetails