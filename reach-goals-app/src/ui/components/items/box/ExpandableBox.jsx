import Goal from '../models/Goal'
import Assignment from '../models/Assignment'
import ButtonAction from '../elements/ButtonAction'

const boxConfigs = {
    default: [
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
}

const ExpandableBox = (props) => {
    const containerType = props?.containerType ?? ''


    return (
        <>
            {boxConfigs.default.map(box => (
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