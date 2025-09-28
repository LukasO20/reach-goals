import { useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { filterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import Goal from '../../models/Goal/Goal.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'

const boxConfigs = (type) => {
    const goal = [
        {
            currentfilter: { notAssignmentRelation: true },
            label: 'without assignments',
        },
        {
            currentfilter: { goalAssignmentRelation: true },
            label: 'with assignments',
        },
        {
            currentfilter: { goalTagRelation: true },
            label: 'with tags',
        },
        {
            currentfilter: { goalSomeID: true },
            label: 'every goal',
        },
    ]

    const assignment = [
        {
            currentfilter: { notGoalRelation: true },
            label: 'without goals',
        },
        {
            currentfilter: { assignmentGoalRelation: true },
            label: 'with goals',
        },
        {
            currentfilter: { assignmentTagRelation: true },
            label: 'with tags',
        },
        {
            currentfilter: { assignmentSomeID: true },
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
    const configType = layoutComponent.objectives.layout

    const [filterRenderModel, setFilterRenderModel] = useState(filterModelMap)
    const filterButtonActive = Object.entries(filterRenderModel).find(([_, value]) => value === true)?.[0] ?? `${configType}SomeID`

    const handleOptions = (currentfilter) => {
        setFilterRenderModel(() => ({
            ...currentfilter,
            type: configType
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
                                <Goal display={{type: 'mini-list'}} {...filterRenderModel} />
                                :
                            configType === 'assignment' ?
                                <Assignment display={{type: 'mini-list'}} {...filterRenderModel} />
                                :
                                <>
                                    <Goal display={{type: 'mini-list'}} goalSomeID={'all'} />
                                    <Assignment display={{type: 'mini-list'}} assignmentSomeID={true} />
                                </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ExpandableBox