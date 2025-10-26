import { useState, useContext, useEffect } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { useGoalProvider } from '../../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../../provider/model/AssignmentModelProvider.jsx'

import { iconMap, filterGetModelMap } from '../../../../../utils/mapping/mappingUtils.js'

import Goal from '../../models/Goal/Goal.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'

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

const ExpandableBox = (props) => {
    const { layoutComponent } = useSwitchLayout()
    const { updateFilterModel } = useContext(ManageModelContext)

    const configType = layoutComponent.objectives.layout

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {
            type: configType,
            source: 'core',
            assignmentSomeID: 'all',
            assignmentGoalRelation: null,
            assignmentTagRelation: null,
            notGoalRelation: null,
        },
        goal: {
            type: configType,
            source: 'core',
            goalSomeID: 'all',
            goalAssignmentRelation: null,
            goalTagRelation: null,
            notAssignmentRelation: null,
        },
        [`${configType}SomeID`]: 'all' //A default value to filterButtonActive
    })

    const filterButtonActive = Object.entries(currentFilterData[configType] ?? currentFilterData)
        .find(([_, value]) => value === 'all')?.[0]

    const handleOptions = (currentfilter) => {
        const filterGetGoal = filterGetModelMap({ ...currentfilter }, 'goal', 'core')
        const filterGetAssignment = filterGetModelMap({ ...currentfilter }, 'assignment', 'core')

        updateFilterModel(filterGetGoal, 'goal')
        updateFilterModel(filterGetAssignment, 'assignment')

        setCurrentFilterData(() => ({
            [configType]: {
                ...currentfilter
            }
        }))
    }

    return (
        <>
            <div className='head'>
                {
                    <>
                        <div className='title'>
                            <h2>{iconMap[configType]}{configType}</h2>
                        </div>
                        <div className='options'>
                            {
                                boxConfigs(configType).map((box, index) => {
                                    const currentButton = Object.keys(box.currentfilter)[0]

                                    return <ButtonAction key={index} classBtn={`button-action plan-round max-width small objective ${currentButton === filterButtonActive && 'active'}`}
                                        title={box.label} onClick={(e) => { handleOptions(box.currentfilter) }} />
                                })
                            }
                        </div>
                    </>
                }
            </div>
            <div className='body'>
                {
                    <>
                        {
                            configType === 'goal' ?
                                <Goal display={{ type: 'mini-list' }} />
                                :
                                configType === 'assignment' ?
                                    <Assignment display={{ type: 'mini-list' }} />
                                    :
                                    <>
                                        <Goal display={{ type: 'mini-list' }} goalSomeID={'all'} />
                                        <Assignment display={{ type: 'mini-list' }} assignmentSomeID={'all'} />
                                    </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ExpandableBox