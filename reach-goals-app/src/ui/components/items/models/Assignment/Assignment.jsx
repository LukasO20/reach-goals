import { useContext, useEffect, useMemo, useState } from 'react'

import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap, filterGetModelMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Assignment/Assignment.scss'

const Assignment = (props) => {
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateFormModel, updateFilterModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { layoutComponent, switchLayoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { data, loading, error, remove, refetch } = useAssignmentProvider()

    const status = props.status
    const display = props.display
    const sourceForm = props.sourceForm
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetAssignment = useMemo(() => (
        filterGetModelMap(props, 'assignment', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.assignmentGoalRelation,
        props.assignmentSomeID,
        props.assignmentTagRelation,
        props.notGoalRelation
    ])

    //First will be checked form source to render an assignment, if not, will be render according assignment filter
    const renderModel = sourceForm?.assignments ?? model.dataModel.assignment[filterGetAssignment.source].data

    const deleteAssignment = async (id) => {
        remove(id)
        update({ toast: `assignment was deleted` })
    }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }

    const assignmentClick = ({ id, name }, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = renderModel.find(m => m.id === id)

            addToTransportModel({ ...selected, type: 'assignment' })
            return updateFormModel({
                keyObject: 'assignments',
                value: {
                    id: id, name: name
                },
                type: 'array'
            })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' }))
            return setPendingPanel(true)
        }
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            updateFormModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        if (filterGetAssignment["Without key"] === "Without value") return
        refetch(updateFilterModel(filterGetAssignment, 'assignment'))
    }, [])

    useEffect(() => {
        if (filterGetAssignment["Without key"] === "Without value") return

        const currentFilter = model.filter.assignment
        if (currentFilter.source === 'core' || currentFilter.source === 'support') {
            updateDataModel(data, 'assignment', currentFilter.source)
        }
    }, [data])

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    //console.log('ASSIGNMENT LOADED - ', assignment)

    return (
        loading && !renderModel?.length ?
            <p>Loading...</p>
            :
            renderModel?.length ?
                <CardItem type={'assignment'}
                    model={(() => {
                        return typeof status === 'string' && status !== '' ?
                            renderModel.filter(item => item.status === status) :
                            renderModel
                    })()}
                    clickFunction={clickEvents} display={display} />
                : null
    )
}

export default Assignment