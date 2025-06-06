import { useContext } from 'react'

import { SwitchLayoutContext } from '../../../../provider/SwitchLayoutProvider'

import Goal from '../models/Goal'
import Assignment from '../models/Assignment'
import ButtonAction from '../elements/ButtonAction'

const boxConfigs = (type) => {
    const goal = [
        {
            key: 'goal-no-assignment',
            className: 'goal',
            label: 'Goals without assignment relation',
            content: <Goal notAssignmentRelation={true} />,
            btnClass: 'goal'
        },
        {
            key: 'goal-assignment',
            className: 'goal-assignment',
            label: 'Goals with assignments',
            content: <Goal goalAssignmentRelation={true} />,
            btnClass: 'goal'
        },
        {
            key: 'goal-tags',
            className: 'goal-tags',
            label: 'Goals with tags',
            content: <Goal goalTagRelation={true} />,
            btnClass: 'goal'
        },
    ]

    const assignment = [
        {
            key: 'assignment-no-goal',
            className: 'assignment',
            label: 'Assignments without goal relation',
            content: <Assignment notGoalRelation={true} />,
            btnClass: 'assignment'
        },
        {
            key: 'assignment-goal',
            className: 'assignment-goal',
            label: 'Assignments with goals',
            content: <Assignment assignmentGoalRelation={true} />,
            btnClass: 'goal'
        },
        {
            key: 'assignment-tags',
            className: 'assignment-tags',
            label: 'Assignments with tags',
            content: <Assignment assignmentTagRelation={true} />,
            btnClass: 'assignment'
        }
    ]

    const defaultConfig = [
        ...goal, ...assignment
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
    const { layoutComponent } = useContext(SwitchLayoutContext)     
    const containerType = props?.containerType ?? ''

    const configType = layoutComponent.objectives.layout

    return (
        <>
            {boxConfigs(configType).map(box => (
                <div className={`box-list ${box.className} ${containerType}`} key={box.key}>
                    <div className='head'>
                        <label>{box.label}</label>
                        <ButtonAction classBtn={`button-expand ${box.btnClass}`} iconFa='fa-solid fa-chevron-down' />
                    </div>
                    <div className='body'>
                        {box.content}
                    </div>
                </div>
            ))}
        </>
    )
}

export default ExpandableBox