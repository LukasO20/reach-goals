import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom' 

import { useGetModel } from '../../../../hook/useGetModel'
import { useDeleteModel } from '../../../../hook/useDeleteModel'

import { ManageModelContext } from '../../../../provider/ManageModelProvider'
import { VisibilityContext } from '../../../../provider/VisibilityProvider'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'

import { insertModelComponent } from '../../../utils/layout/uiLayout'
import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils'

import ButtonAction from '../elements/ButtonAction'

import '../../../styles/items/models/Assignment.scss'

const Assignment = (props) => {
    const [assignment, setAssignment] = useState([])
    const [erro, setErro] = useState(false)
    
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setSelectModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const target = useMemo(() => targetMap(['panel-right', 'assignment']), []) 
    const display = props.display ?? {
        sideAction: false, 
        type: 'mini-list',
        formMode: props?.formMode ?? false
    }

    const requestPropsAssignment = {
        type: 'assignment',
        goalRelation: props.goalRelation ?? null,
        assignmentSomeID: props.assignmentSomeID ?? null,
        notGoalRelation: props.notGoalRelation ?? null
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsAssignment)

    const getAssignment = async () => {
        try { setAssignment(getData) }
        catch (error) { setErro(`Failed to load assignment: ${error.message}`) }
    }

    useEffect(() => { getAssignment() }, [getData])

    const { data: deleteData, deleteModel } = useDeleteModel({})

    const deleteAssignment = (id) => {
        deleteModel({ type: 'assignment', assignmentID: id })
        setAssignment((prevAssignment) => prevAssignment.filter((assignment) => assignment.id !== id))
    }

    const editAssignment = useCallback((id) => {
        try {
            setSelectModel(id)        
        } catch (error) {
            setErro(`Failed to edit this assignment: ${erro.message}`)
        }
    }, [setSelectModel])

    const handleAssignmentClick = useCallback(
        (id, e) => {
            const isSelectableModel = props.selectableModel ?? false
            if (isSelectableModel) { 
                e.stopPropagation()
                return insertModelComponent(props, 'assignment', e)
            }

            setSelectModel(id)
            toggleVisibility(target, e)
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
        },
        [setSelectModel, toggleVisibility, target]
    )

    return (
        assignment.map(assignment => (
            <div className={`assignment ${display.type}`} id={assignment.id} key={assignment.id} onClick={(e) => handleAssignmentClick(assignment.id, e)}>
                {
                    display.type === 'card' ?
                    <Link to={`${currentLocation}/details`}>
                        <div className='head'>
                            <label className='line-info'><i className='icon-st fa-solid fa-list-check'></i><label>{assignment.name}</label></label>
                        </div>
                        <div className='body'></div>
                    </Link>
                    :
                    <div className='head'>
                        <label className='line-info'><i className='icon-st fa-solid fa-list-check'></i><label>{assignment.name}</label></label>
                    </div>
                }
                {
                    display.sideAction && 
                    <div className='side-actions'>
                        <ButtonAction onClick={() => editAssignment(assignment.id)} target={targetMap(['panel-center', 'assignment'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-assignment' iconFa='fa-regular fa-pen-to-square'/>
                        <ButtonAction onClick={() => deleteAssignment(assignment.id)} target={targetMap(null)} classBtn='remove-assignment' iconFa='fa-regular fa-trash-can'/>
                    </div>
                }
                {display.formMode && <input hidden readOnly={true} value={assignment.id} id={assignment.id} />}
            </div>
        ))
    )
}

export default Assignment