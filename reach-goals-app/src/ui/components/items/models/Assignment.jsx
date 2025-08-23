import { useCallback, useContext, useEffect, useState } from 'react'

import { useAssignmentModel } from '../../../../provider/model/AssignmentModelProvider.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { filterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Assignment.scss'

const Assignment = (props) => {
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)
    const [activeModelSource, setActiveModelSource] = useState([])

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useSwitchLayout()
    const { data, loading, refetch, remove } = useAssignmentModel()

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetAssignment = {
        ...filterModelMap,
        type: 'assignment',
        source: props.typeDataSource ?? 'core',
        assignmentGoalRelation: props.assignmentGoalRelation ?? null,
        assignmentSomeID: props.assignmentSomeID ?? null,
        assignmentTagRelation: props.assignmentTagRelation ?? null,
        notGoalRelation: props.notGoalRelation ?? null
    }

    const deleteAssignment = async (id) => {
        await remove(id)
        refetch(filterGetAssignment)
    }

    const editAssignment = useCallback((id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }, [setModel])

    const assignmentClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = activeModelSource.find(m => m.id === id)

            addToTransportModel({ ...selected, type: 'assignment' })
            return updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array' })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' }))
            setPendingPanel(true)
            return
        }
    }

    const removeElDOMClick = (id, e) => {
        if (id) {
            e.stopPropagation()
            updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        const fromModelSource = props.fromModelSource?.assignment 
        
        if (fromModelSource && fromModelSource.length) setActiveModelSource(fromModelSource)
        else setActiveModelSource(data[filterGetAssignment.source])
    }, [data])

    useEffect(() => {
        refetch(filterGetAssignment)
    }, [])

    useEffect(() => {
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap('panel', 'layout', 'right'))
            toggleVisibility(targetMap(['panel-right', 'assignment']))
            setPendingPanel(false)
        }
    }, [pendingPanel])

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    //console.log('ASSIGNMENT LOADED - ', assignment)

    return (
        loading && data.length === 0 ?
            <p>Loading...</p>
            :
            <CardItem type={'assignment'} model={activeModelSource ?? []} clickFunction={clickEvents} display={display} />
    )
}

export default Assignment