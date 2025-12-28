import { useState, useContext } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

import { filterGetModelMap, modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'

import Assignment from '../../models/Assignment/Assignment.jsx'
import Goal from '../../models/Goal/Goal.jsx'
import ModelSwitcher from '../../models/ModelSwitcher.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Loading from '../Loading/Loading.jsx'

import './ModelTabs.scss'

const ModelTabs = () => {
    const { layoutComponent } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)
    const { page: { loading: loadingGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment } } = useAssignmentProvider()
    const { panel: { loading: loadingTag } } = useTagProvider()

    const layoutObjectives = layoutComponent.objectives.layout

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
        tag: {}
    })

    const isPanelTagScope = layoutComponent.panel.layout === 'tag'
    const isObjectivePage = layoutComponent.page === 'objectives'
    const isDetailsModel = layoutObjectives === 'goal' || layoutObjectives === 'assignment' || false
    const typeFilter = isPanelTagScope ? 'tag' : isObjectivePage ? layoutComponent.objectives.layout : null

    const filterButtonActive = currentFilterData[typeFilter] ?
        Object.entries(currentFilterData[typeFilter]).find(([_, value]) => value === 'all')?.[0]
        : null

    const handleOptions = (currentfilter) => {
        if (typeFilter === 'goal') {
            const filterGetGoal = filterGetModelMap({ ...currentfilter }, 'goal', 'core')
            updateFilterModel(filterGetGoal, 'goal', 'page')
        }

        if (typeFilter === 'assignment') {
            const filterGetAssignment = filterGetModelMap({ ...currentfilter }, 'assignment', 'core')
            updateFilterModel(filterGetAssignment, 'assignment', 'page')
        }

        if (typeFilter === 'tag') {
            const filterGetTag = filterGetModelMap({ ...currentfilter }, 'tag', 'core')
            updateFilterModel(filterGetTag, 'tag', 'panel')
        }

        setCurrentFilterData(() => ({
            [typeFilter]: { ...currentfilter }
        }))
    }

    const modelSwitcherProps = {
        display: { type: 'card-mini' },
        detailsModel: isDetailsModel,
    }

    const isLoading = !!loadingGoal || !!loadingAssignment || !!loadingTag
    const isAllModels = !isLoading && layoutObjectives === 'default'
    const isTypeModel = (layoutObjectives === 'goal' || layoutObjectives === 'assignment' || layoutObjectives === 'tag') && !isLoading

    return (
        <div className={`model-tabs ${layoutObjectives}`}>
            <div className='head'>
                <div className='options-sections'>
                    {
                        modelTabsMap[layoutObjectives]?.map((tab, index) => {
                            const currentButton = Object.keys(tab.currentfilter)[0]
                            const isNullFilter = !filterButtonActive && tab.label.includes('every')

                            return <ButtonAction key={index} classBtn={`button-action plan-round max-width small model-tabs 
                            ${currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''}`}
                                title={tab.label} onClick={(e) => { handleOptions(tab.currentfilter) }} />
                        })
                    }
                </div>
            </div>
            <div className='body scrollable'>
                {isLoading && <Loading />}
                {isTypeModel && <ModelSwitcher type={layoutObjectives} propsReference={modelSwitcherProps} />}
                {
                    isAllModels &&
                    <>
                        <Goal display={{ type: 'card-mini' }} goalSomeID={'all'} detailsModel={true} />
                        <Assignment display={{ type: 'card-mini' }} notGoalRelation={'all'} detailsModel={true} />
                    </>
                }
            </div>
        </div>
    )
}

export default ModelTabs