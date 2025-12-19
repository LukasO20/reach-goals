import { useState, useContext, useEffect } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'
import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

import { iconMap, filterGetModelMap, modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../../utils/utils.js'

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

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
        tab: {}
    })

    const requiredSuccessful = hasRequiredProps(props, ['type'])
    if (!requiredSuccessful) return null

    const isPanelScope = layoutComponent.panel.layout === 'right'
    const isObjecttivePage = layoutComponent.page === 'objectives'
    const typeFilter = isPanelScope ? 'tag' : isObjecttivePage ? layoutComponent.objectives.layout : null

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
        detailsModel: isPanelScope
    }

    const isLoading = loadingGoal || loadingAssignment || loadingTag

    return (
        <div className='model-tabs'>
            <div className='head'>
                {
                    modelTabsMap[type].map((tab, index) => {
                        const currentButton = Object.keys(tab.currentfilter)[0]
                        const isNullFilter = !filterButtonActive && tab.label.includes('every')

                        return <ButtonAction key={index} classBtn={`button-action plan-round max-width small model-tabs 
                            ${currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''}`}
                            title={tab.label} onClick={(e) => { handleOptions(tab.currentfilter) }} />
                    })
                }
            </div>
            <div className='body scrollable'>
                { isLoading ? <Loading /> : <ModelSwitcher type={type} propsReference={modelSwitcherProps} /> }
            </div>
        </div>
    )
}

export default ModelTabs