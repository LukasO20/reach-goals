import { useState, useContext, useEffect } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'

import { iconMap, filterGetModelMap } from '../../../../../utils/mapping/mappingUtils.js'

import Goal from '../../models/Goal/Goal.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'
import ModelSwitcher from '../../models/ModelSwitcher.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Loading from '../Loading/Loading.jsx'

import './ExpandableBox.scss'

const boxConfigs = (type) => {
    const goal = [
        {
            currentfilter: { notAssignmentRelation: 'all' },
            label: 'without assignments',
        },
        {
            currentfilter: { goalAssignmentRelation: 'all' },
            label: 'with assignments',
        },
        {
            currentfilter: { goalTagRelation: 'all' },
            label: 'with tags',
        },
        {
            currentfilter: { goalSomeID: 'all' },
            label: 'every goal',
        },
    ]

    const assignment = [
        {
            currentfilter: { notGoalRelation: 'all' },
            label: 'without goals',
        },
        {
            currentfilter: { assignmentGoalRelation: 'all' },
            label: 'with goals',
        },
        {
            currentfilter: { assignmentTagRelation: 'all' },
            label: 'with tags',
        },
        {
            currentfilter: { assignmentSomeID: 'all' },
            label: 'every assignment',
        }
    ]

    switch (type) {
        case 'goal':
            return goal
        case 'assignment':
            return assignment
        default:
            return []
    }
}

const ExpandableBox = () => {
    const { layoutComponent } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)
    const { page: { loading: loadingGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment } } = useAssignmentProvider()

    const configType = layoutComponent.objectives.layout

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
    })

    const filterButtonActive = currentFilterData[configType] ?
        Object.entries(currentFilterData[configType]).find(([_, value]) => value === 'all')?.[0]
        : null

    const handleOptions = (currentfilter) => {
        if (configType === 'goal') {
            const filterGetGoal = filterGetModelMap({ ...currentfilter }, 'goal', 'core')
            updateFilterModel(filterGetGoal, 'goal', 'page')
        }

        if (configType === 'assignment') {
            const filterGetAssignment = filterGetModelMap({ ...currentfilter }, 'assignment', 'core')
            updateFilterModel(filterGetAssignment, 'assignment', 'page')
        }

        setCurrentFilterData(() => ({
            [configType]: { ...currentfilter }
        }))
    }

    useEffect(() => {
        if (configType === 'default') {
            const filterGoal = filterGetModelMap({
                goalSomeID: 'all', type: 'goal', source: 'core'
            }, 'goal', 'core')

            const filterAssignment = filterGetModelMap({
                assignmentSomeID: 'all', type: 'assignment', source: 'core'
            }, 'assignment', 'core')

            updateFilterModel(filterGoal, 'goal', 'page')
            updateFilterModel(filterAssignment, 'assignment', 'page')
        }
    }, [configType])

    const modelSwitcherProps = {
        display: { type: 'mini-card' },
        detailsModel: true
    }

    return (
        <div className='expandable-model-box'>
            <div className='head'>
                {
                    <>
                        <div className='title'>
                            <h2>{iconMap[configType === 'default' ? 'icons' : configType]}{configType}</h2>
                        </div>
                        <div className='options'>
                            {
                                boxConfigs(configType).map((box, index) => {
                                    const currentButton = Object.keys(box.currentfilter)[0]

                                    return <ButtonAction key={index} classBtn={`button-action plan-round max-width small objective 
                                        ${currentButton === filterButtonActive ? 'active' : !filterButtonActive && index === 3 && 'active'}`}
                                        title={box.label} onClick={(e) => { handleOptions(box.currentfilter) }} />
                                })
                            }
                        </div>
                    </>
                }
            </div>
            <div className='body scrollable'>
                {
                    (loadingGoal || loadingAssignment) ?
                        <Loading />
                        :
                        configType === 'default' ?
                            <>
                                <Goal display={{ type: 'mini-card' }} detailsModel={true} />
                                <Assignment display={{ type: 'mini-card' }} detailsModel={true} />
                            </>
                            :
                            <ModelSwitcher type={configType} propsReference={modelSwitcherProps} />
                }
            </div>
        </div>
    )
}

export default ExpandableBox