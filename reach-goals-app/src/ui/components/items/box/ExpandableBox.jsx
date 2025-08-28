import { useState } from 'react'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { filterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import Goal from '../models/Goal.jsx'
import Assignment from '../models/Assignment.jsx'
import ButtonAction from '../elements/ButtonAction.jsx'

const boxConfigs = (type) => {
    const goal = [
        {
            currentfilter: 'goal-no-assignment',
            label: 'without assignments',
        },
        {
            currentfilter: 'goal-assignment',
            label: 'with assignments',
        },
        {
            currentfilter: 'goal-tags',
            label: 'with tags',
        },
        {
            currentfilter: 'goal-every',
            label: 'every goal',
        },
    ]

    const assignment = [
        {
            currentfilter: 'assignment-no-goal',
            label: 'without goals',
        },
        {
            currentfilter: 'assignment-goal',
            label: 'with goals',
        },
        {
            currentfilter: 'assignment-tags',
            label: 'with tags',
        },
        {
            currentfilter: 'assignment-every',
            label: 'every assignment',
        }
    ]

    const defaultConfig = [
        // ...goal, ...assignment
    ]

    switch (type) {
        case 'goal':
            return goal
        case 'assignment':
            return assignment
        default:
            return defaultConfig
    }
}

const ExpandableBox = (props) => {
    const { layoutComponent } = useSwitchLayout()
    const containerType = props?.containerType ?? ''

    const configType = layoutComponent.objectives.layout
    const currentIcoType = configType === 'goal' ? 'fa-bullseye' : configType === 'assignment' ? 'fa-list-check' : ''

    const [filterRenderModel, setFilterRenderModel] = useState(filterModelMap)
    const handleOptions = (currentfilter) => {
        setFilterRenderModel(prevMap => ({
            ...prevMap,
            currentfilter
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
                                    return <ButtonAction classBtn={'objective-filter option'} title={box.label} />
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
                                <Goal {...filterRenderModel} />
                                :
                            configType === 'assignment' ?
                                <Assignment/>
                                :
                                <>
                                    <Goal display={{type: 'mini-list'}} goalSomeID={true}/>
                                    <Assignment display={{type: 'mini-list'}} notGoalRelation={true}/>
                                </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ExpandableBox