import { useContext, useEffect, useMemo, useState } from 'react'

import { useGoalModel } from '../../../../../provider/model/GoalModelProvider.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap, filterGetModelMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../../elements/CardItem/CardItem.jsx'

import '../Goal/Goal.scss'

const Goal = (props) => {
    const [erro, setErro] = useState(false)
    const [pendingPanel, setPendingPanel] = useState(false)
    const [activeModelSource, setActiveModelSource] = useState([])

    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, updateSubmitModel, addToTransportModel } = useContext(ManageModelContext)
    const { layoutComponent, switchLayoutComponent } = useSwitchLayout()
    const { update } = useTitle()
    const { data, saved, loading, refetch, remove } = useGoalModel()

    const status = props.status
    const display = props.display
    const isSelectableModel = props.selectableModel ?? false
    const isDetailsModel = props.detailsModel ?? false

    const filterGetGoal = useMemo(() => (
        filterGetModelMap(props, 'goal', props.typeDataSource ?? 'core')
    ), [
        props.typeDataSource,
        props.goalAssignmentRelation,
        props.goalSomeID,
        props.goalTagRelation,
        props.notAssignmentRelation
    ])

    const deleteGoal = async (id) => {
        remove(id)
            .then(() => refetch(filterGetGoal))
            .then(() => update({ toast: `goal was deleted` }))
    }

    const editGoal = (id) => {
        try { setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' })) }
        catch (error) { setErro(`Failed to edit this goal: ${error}`) }
    }

    const goalClick = (id, e) => {
        e.stopPropagation()

        if (isSelectableModel) {
            const selected = data.core.find(m => m.id === id)

            if (model.transportModel.goal.length > 0) return

            addToTransportModel({ ...selected, type: 'goal' })
            return updateSubmitModel({
                keyObject: 'goalID',
                value: id
            })
        }

        if (isDetailsModel) {
            setModel(prev => ({ ...prev, mainModelID: id, typeModel: 'goal' }))
            return setPendingPanel(true)
        }
    }

    useEffect(() => {        
        const fetch = async () => {
            if (typeof saved?.id === 'number') {
                await refetch(filterGetGoal)
                return
            }

            if (filterGetGoal["Without key"] === "Without value") return
            await refetch(filterGetGoal)
        }

        fetch()
    }, [filterGetGoal, saved])

    useEffect(() => {
        if (pendingPanel && model.mainModelID) {
            switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
            toggleVisibility(targetMap(['panel-right', 'goal']))
            return setPendingPanel(false)
        }

        const goalSource = data[filterGetGoal.source]
        if (!filterGetGoal["Without key"]) return setActiveModelSource(goalSource)
    }, [pendingPanel, data])

    const clickEvents = {
        card: goalClick,
        edit: editGoal,
        delete: deleteGoal
    }

    //console.log('GOAL LOADED - ', goal)
    return (
        loading && activeModelSource.length === 0 ?
            <p>Loading...</p>
            :
            activeModelSource?.length ?
                <CardItem type={'goal'}
                    model={(() => {
                        return typeof status === 'string' && status !== '' ?
                            activeModelSource.filter(item => item.status === status) :
                            activeModelSource
                    })()}
                    clickFunction={clickEvents} display={display} />
                : null
    )
}

export default Goal