import { useState } from 'react'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import Goal from '../models/Goal.jsx'
import Assignment from '../models/Assignment.jsx'
import ButtonAction from '../elements/ButtonAction.jsx'

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
    const currentIcoType = configType === 'goal' ? 'fa-bullseye' : configType === 'assignment' ? 'fa-list-check' : ''

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
                            <h2><i className={'fa-solid ' + currentIcoType}></i>{configType}</h2>
                        </div>
                        <div className='options'>
                            {
                                boxConfigs(configType).map(box => {
                                    return <ButtonAction classBtn={'objective-filter option'} title={box.label} onClick={() => { handleOptions(box.currentfilter) }} />
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
                                    <Goal display={{type: 'mini-list'}} goalSomeID={true}/>
                                    <Assignment display={{type: 'mini-list'}} assignmentSomeID={true}/>
                                </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ExpandableBox