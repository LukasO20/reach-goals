import { useState, useContext } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

import { iconMap, filterGetModelMap, modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../../utils/utils.js'

import Assignment from '../../models/Assignment/Assignment.jsx'
import Goal from '../../models/Goal/Goal.jsx'
import ModelSwitcher from '../../models/ModelSwitcher.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Loading from '../Loading/Loading.jsx'

import './ModelTabs.scss'

const ModelTabs = (props) => {
    const { type } = props
    const { layoutComponent } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)
    const { page: { loading: loadingGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment } } = useAssignmentProvider()
    const { panel: { loading: loadingTag } } = useTagProvider()

    const isLoading = !!loadingGoal || !!loadingAssignment || !!loadingTag
    const isAllModels = !isLoading && type === 'default'
    const isTypeModel = (type === 'goal' || type === 'assignment' || type === 'tag') && !isLoading

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
        tab: {}
    })

    const requiredSuccessful = hasRequiredProps(props, ['type'])
    if (!requiredSuccessful) return null

    const isPanelScope = layoutComponent.panel.layout === 'right'
    const isObjectivePage = layoutComponent.page === 'objectives'
    const isDetailsModel = type === 'goal' || type === 'assignment' || false
    const typeFilter = isPanelScope ? 'tag' : isObjectivePage ? layoutComponent.objectives.layout : null

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

    return (
        <div className={`model-tabs ${type}`}>
            <div className='head'>
                <div className='options-sections'>
                    {
                        modelTabsMap[type]?.map((tab, index) => {
                            const currentButton = Object.keys(tab.currentfilter)[0]
                            const isNullFilter = !filterButtonActive && tab.label.includes('every')

                            return <ButtonAction key={index} classBtn={`button-action plan-round max-width small model-tabs 
                            ${currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''}`}
                                title={tab.label} onClick={(e) => { handleOptions(tab.currentfilter) }} />
                        })
                    }
                </div>
            </div>
            <div className='body'>
                {isLoading && <Loading />}
                {isTypeModel && <ModelSwitcher type={type} propsReference={modelSwitcherProps} />}
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