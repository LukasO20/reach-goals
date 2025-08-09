import { useCallback, useContext, useEffect, useState } from 'react'

import { useDeleteModel } from '../../../../hook/useDeleteModel.js'

import { DataModelContext } from '../../../../provider/DataModelProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'
import { requestPropsGetModel } from '../../../../utils/mapping/mappingUtilsHook.js'

import CardItem from '../elements/CardItem.jsx'

import '../../../styles/items/models/Assignment.scss'

const Assignment = (props) => {
    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { switchLayoutComponent } = useContext(SwitchLayoutContext)
    const { modelGet, getModel } = useContext(DataModelContext)

    const { assignment } = modelGet
    const modelSource = props.modelRef?.assignment

    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { data: deleteData, deleteModel } = useDeleteModel({})

    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const requestPropsAssignment = {
        ...requestPropsGetModel,
        type: 'assignment',
        assignmentGoalRelation: props.assignmentGoalRelation ?? null,
        assignmentSomeID: props.assignmentSomeID ?? null,
        assignmentTagRelation: props.assignmentTagRelation ?? null,
        notGoalRelation: props.notGoalRelation ?? null
    }

    const deleteAssignment = (id) => {
        deleteModel({ type: 'assignment', assignmentID: id })
    }

    const editAssignment = useCallback((id) => {
        try { setModel({ ...model, mainModelID: id, typeModel: 'assignment' }) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }, [setModel])

    const assignmentClick = (id, e) => {
        if (isSelectableModel) {
            e.stopPropagation()
            const selected = assignment.find(m => m.id === id)
            if (model.transportModel.some(item => item.id === selected.id)) return

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
            //Tem que remover o elemento do DOM
        }
    }

    useEffect(() => {
        if (modelSource && modelSource.length) {
            setDataSource(modelSource)
        } else {
            
        }
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
        <CardItem type={'assignment'} model={dataSource} clickFunction={clickEvents} display={display} />
    )
}

export default Assignment