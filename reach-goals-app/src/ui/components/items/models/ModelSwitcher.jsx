import Assignment from './Assignment/Assignment.jsx'
import Goal from './Goal/Goal.jsx'
import Tag from './Tag/Tag.jsx'

const ModelSwitcher = (props) => {
    const type = props?.type
    const propsReference = props?.propsReference
    const externalFunction = props?.exFunction
    const selectableModel = props?.selectableModel
    const action = props?.action

    if (type === 'goal-relation' || type === 'assignment')
        return <Assignment {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
    else if (type === 'assignment-relation' || type === 'goal')
        return <Goal {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
    else if (type === 'tag')
        return <Tag {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
    else
        return null
}

export default ModelSwitcher