import { useContext, useEffect, useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Assignment/Assignment.scss'

const Assignment = (props) => {
    const [erro, setErro] = useState(false)

    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { switchLayoutComponent, layoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { page: { data: dataPage }, panel: { data: dataPanel }, remove } = useAssignmentProvider()

    const status = props.status
    const display = props.display
    const sourceForm = props.sourceForm
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const currentScope = model.filter.assignment.scope
    const currentFilter = model.filter.assignment[currentScope]
    //First will be checked form source to render an assignment, if not, will be render according assignment filter
    const render = sourceForm?.assignments ?? model.dataModel.assignment[currentFilter.source]?.data ?? dataPage

    const deleteAssignment = async (id) => {
        remove(id)
        update({ toast: `assignment was deleted` })
    }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }

    const assignmentClick = (assignment, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = model.dataModel.assignment.support.data.find(m => m.id === assignment.id)

            addToTransportModel({ ...selected, type: 'assignment' })
            return updateFormModel({
                keyObject: 'assignments',
                value: {
                    id: assignment.id, name: assignment.name
                },
                type: 'array'
            })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: assignment.id, formModel: assignment, typeModel: 'assignment' }))
            switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
            toggleVisibility(targetMap(['panel-right', 'assignment']))
        }
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            updateFormModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        const currentData = currentScope === 'page' ? dataPage : dataPanel

        if (currentFilter.source === 'core' || currentFilter.source === 'support') {
            updateDataModel(currentData, 'assignment', currentFilter.source)
        }
    }, [dataPage, dataPanel])

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    //console.log('ASSIGNMENT LOADED - ', assignment)

    return (
        render?.length ?
            <CardItem type={'assignment'}
                model={(() => {
                    return typeof status === 'string' && status !== '' ?
                        render.filter(item => item.status === status) : render
                })()}
                clickFunction={clickEvents} display={display} />
            : null
    )
}

export default Assignment