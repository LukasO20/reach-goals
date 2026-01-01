import Assignment from './Assignment/Assignment.jsx'
import Goal from './Goal/Goal.jsx'
import Tag from './Tag/Tag.jsx'

const ModelSwitcher = ({ type, propsReference, exFunction, selectableModel, action }) => {
    if (type === 'goal-relation' || type === 'assignment')
        return <Assignment {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    else if (type === 'assignment-relation' || type === 'goal')
        return <Goal {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    else if (type === 'tag')
        return <Tag {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    else
        return null
}

export default ModelSwitcher