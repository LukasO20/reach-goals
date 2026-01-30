import { useContext, useEffect } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { updateDataModelMap, updateFormModelMap, addToTransportModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Card from '../../elements/Card/Card.jsx'
import CardMini from '../../elements/CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import '../Assignment/Assignment.scss'

const Assignment = ({ status, display, sourceForm, selectableModel = false, detailsModel = false }) => {
    const { model, setModel, updateFormModel, updateDataModel, addToTransportModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { updateSwitchLayout } = useSwitchLayout()
    const { page: { data: dataPage }, modal: { data: dataPanel }, remove, removeSuccess, removing, removingVariables } = useAssignmentProvider()

    const currentScope = model.filter.assignment.scope
    const currentFilter = model.filter.assignment[currentScope]

    //First will be checked form source to render an assignment, if not, will be render according assignment filter
    const baseData =
        sourceForm?.assignments ??
        model.dataModel.assignment[currentFilter.source]?.data ??
        dataPage ??
        []

    const renderCard = baseData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
        && item.status === status
    )

    const renderCardMini = baseData.filter(item =>
        !(removeSuccess && removingVariables && item.id === removingVariables)
    )

    const pendingState = {
        removing: removing,
        removingVariables: removingVariables
    }

    const deleteAssignment = async (id) => { remove(id) }

    const editAssignment = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'assignment' })) }
        catch (error) { console.error(`Failed to edit this assignment: ${error}`) }
    }

    const assignmentClick = (assignment, e) => {
        e.stopPropagation()

        if (selectableModel) {
            const selected = model.dataModel.assignment.support.data.find(m => m.id === assignment.id)
            const dataUpdateFormModel = updateFormModelMap({
                keyObject: 'assignments',
                value: { id: assignment.id, name: assignment.name },
                action: 'add',
                type: 'array'
            })
            const dataAddToTransportModel = addToTransportModelMap({
                id: selected.id,
                name: selected.name,
                type: 'assignment'
            })

            addToTransportModel(dataAddToTransportModel)
            return updateFormModel(dataUpdateFormModel)
        }

        if (detailsModel) {
            const dataSwitchLayout = switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } })

            setModel(prev => ({ ...prev, mainModelID: assignment.id, formModel: assignment, typeModel: 'assignment' }))
            updateSwitchLayout(dataSwitchLayout)
            toggleVisibility(visibilityMap(['modal-right', 'assignment']))
        }
    }

    const removeElDOMClick = ({ id }) => {
        if (id) {
            const dataUpdateFormModelMap = updateFormModelMap('assignments', { id: id }, 'array', 'remove')
            updateFormModel(dataUpdateFormModelMap)
        }
    }

    useEffect(() => {
        const currentData = currentScope === 'page' ? dataPage : dataPanel

        if ((currentFilter.source === 'core' || currentFilter.source === 'support') && Array.isArray(currentData)) {
            const dataUpdateDataModel = updateDataModelMap({
                data: currentData,
                type: 'assignment',
                scope: currentFilter.source
            })
            updateDataModel(dataUpdateDataModel)
        }
    }, [dataPage, dataPanel, currentFilter.source, currentScope, updateDataModel])

    const clickEvents = {
        card: assignmentClick,
        edit: editAssignment,
        delete: deleteAssignment,
        aux: removeElDOMClick
    }

    const isCard = display.type.includes('card')
    const isCardMini = display.type.includes('card-mini')

    const componentsMap = {
        card: Card,
        cardMini: CardMini,
    }

    const ComponentToRender = isCard ? componentsMap.card : isCardMini ? componentsMap.cardMini : null

    return ComponentToRender ? (
        <ComponentToRender
            type='assignment'
            pendingState={pendingState}
            model={isCard ? renderCard : renderCardMini}
            clickFunction={clickEvents}
            display={display}
        />
    ) : null
}

Assignment.propTypes = {
    display: PropTypes.exact({
        type: PropTypes.arrayOf(
            PropTypes.oneOf(['card', 'card-mini'])
        ).isRequired,
        actions: PropTypes.arrayOf(
            PropTypes.oneOf(['edit', 'delete', 'details', 'remove'])
        )
    }).isRequired,
    sourceForm: PropTypes.shape({
        assignments: PropTypes.array.isRequired
    }),
    selectableModel: PropTypes.bool,
    detailsModel: PropTypes.bool
}

export default Assignment