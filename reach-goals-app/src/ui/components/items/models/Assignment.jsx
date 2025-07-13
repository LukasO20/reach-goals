import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useGetModel } from '../../../../hook/useGetModel.js'
import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils.js'

import ButtonAction from '../elements/ButtonAction.jsx'

import '../../../styles/items/models/Assignment.scss'

const Assignment = (props) => {
    const [assignment, setAssignment] = useState([])
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)

    const location = useLocation()
    const currentLocation = useMemo(() => {
        return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    }, [location.pathname])

    const display = props.display ?? {
        sideAction: false,
        type: 'mini-list'
    }

    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const requestPropsAssignment = {
        type: 'assignment',
        assignmentGoalRelation: props.assignmentGoalRelation ?? null,
        assignmentSomeID: props.assignmentSomeID ?? null,
        assignmentTagRelation: props.assignmentTagRelation ?? null,
        notGoalRelation: props.notGoalRelation ?? null
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsAssignment)
    const { data: deleteData, deleteModel } = useDeleteModel({})

    const getAssignment = async () => {
        try { setAssignment(getData) }
        catch (error) { setErro(`Failed to load assignment: ${error.message}`) }
    }

    const deleteAssignment = (id) => {
        deleteModel({ type: 'assignment', assignmentID: id })
        setAssignment((prevAssignment) => prevAssignment.filter((assignment) => assignment.id !== id))
    }

    const editAssignment = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'assignment' }) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }, [setModel])

    const removeAssignmentDOMClick = (id, e) => {
        if (id) {
            e.stopPropagation()
            updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
            setAssignment((prevAssignment) => prevAssignment.filter((assignment) => assignment.id !== id))
        }
    }

    const assignmentDOMClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = assignment.find(m => m.id === id)
            if (model.transportModel.some(item => item.id === selected.id)) return

            addToTransportModel({...selected, type: 'assignment' })
            return updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array' })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' }))
            setPendingPanel(true)
            return
        }
    }

    useEffect(() => { 
        getAssignment() 
    
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
            toggleVisibility(targetMap(['panel-right', 'assignment']))
            setPendingPanel(false)
        }

    }, [getData, pendingPanel])

    console.log('ASSIGNMENT LOADED - ', assignment)

    return (
        assignment.map(assignment => (
            <div className={`assignment ${display.type}`} id={assignment.id} key={assignment.id} onClick={(e) => assignmentDOMClick(assignment.id, e)}>
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
                        {
                            display.type === "mini-list" ?
                                <ButtonAction onClick={({ e }) => removeAssignmentDOMClick(assignment.id, e)} classBtn='remove-assignment-dom' iconFa='fa-solid fa-xmark' />
                                :
                                <>
                                    <ButtonAction onClick={() => editAssignment(assignment.id)} target={targetMap(['panel-center', 'assignment'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='edit-assignment' iconFa='fa-regular fa-pen-to-square' />
                                    <ButtonAction onClick={() => deleteAssignment(assignment.id)} target={targetMap(null)} classBtn='remove-assignment' iconFa='fa-regular fa-trash-can' />
                                </>
                        }
                    </div>
                }
            </div>
        ))
    )
}

export default Assignment