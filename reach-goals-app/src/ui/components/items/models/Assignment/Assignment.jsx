import { useContext, useEffect, useMemo, useState } from 'react'

import { useAssignmentModel } from '../../../../../provider/model/AssignmentModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap, filterGetModel } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Assignment/Assignment.scss'

const Assignment = (props) => {
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)
    const [activeModelSource, setActiveModelSource] = useState([])

    const { toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { layoutComponent, switchLayoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { data, saved, loading, refetch, remove } = useAssignmentModel()

    const status = props.status
    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetAssignment = useMemo(() => (
        filterGetModel(props, 'assignment', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.assignmentGoalRelation,
        props.assignmentSomeID,
        props.assignmentTagRelation,
        props.notGoalRelation
    ])

    const deleteAssignment = async (id) => {
        remove(id)
            .then(() => refetch(filterGetAssignment))
            .then(() => update({ toast: `assignment was deleted` }))
    }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { setErro(`Failed to edit this assignment: ${error}`) }
    }

    const assignmentClick = ({ id, name }, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = activeModelSource.find(m => m.id === id)

            addToTransportModel({ ...selected, type: 'assignment' })
            return updateSubmitModel({
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
            updateSubmitModel({ keyObject: 'assignments', value: { id: id }, type: 'array', action: 'remove' })
        }
    }

    useEffect(() => {
        const fetch = async () => {
            if (typeof saved.id === 'number') {
                await refetch(filterGetAssignment)
                return
            }
            if (filterGetAssignment["Without key"] === "Without value") return
            await refetch(filterGetAssignment)
        }

        fetch()
    }, [filterGetAssignment, saved])

    useEffect(() => {
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
            toggleVisibility(targetMap(['panel-right', 'assignment']))
            setPendingPanel(false)
        }

        //When form send data, it will be considered as source
        const formSource = props?.sourceForm?.assignments
        const assignmentSource = data[filterGetAssignment.source]

        return setActiveModelSource
            (
                Array.isArray(formSource) ?
                    formSource.length ? formSource : []
                    : assignmentSource
            )
    }, [pendingPanel, data, props.sourceForm])

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    //console.log('ASSIGNMENT LOADED - ', assignment)

    return (
        loading && activeModelSource.length === 0 ?
            <p>Loading...</p>
            :
            activeModelSource?.length ?
                <CardItem type={'assignment'}
                    model={(() => {
                        return typeof status === 'string' && status !== '' ?
                            activeModelSource.filter(item => item.status === status) :
                            activeModelSource
                    })()}
                    clickFunction={clickEvents} display={display} />
                : null
    )
}

export default Assignment