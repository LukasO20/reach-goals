import { useState } from 'react'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { filterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import Goal from '../../models/Goal/Goal.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

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
    const [filterRenderModel, setFilterRenderModel] = useState(filterModelMap)

    const configType = layoutComponent.objectives.layout

    const handleOptions = (currentfilter) => {
        setFilterRenderModel(() => ({
            ...currentfilter
        }))
    }

    return (
        <>
            <div className='head'>
                {
                    <>
                        <div className='title'>
                            <h2>{iconMap[configType]}{configType + 's'}</h2>
                        </div>
                        <div className='options'>
                            {
                                boxConfigs(configType).map((box, index) => {
                                    return <ButtonAction key={index} classBtn={'objective-filter option'} title={box.label} onClick={() => { handleOptions(box.currentfilter) }} />
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
                                    <Goal display={{type: 'mini-list'}} goalSomeID={true} />
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