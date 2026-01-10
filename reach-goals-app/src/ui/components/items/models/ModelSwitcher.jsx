import Assignment from './Assignment/Assignment.jsx'
import Goal from './Goal/Goal.jsx'
import Tag from './Tag/Tag.jsx'

const ModelSwitcher = ({ type, propsReference, exFunction, selectableModel, action }) => {
    if (type === 'assignment')
        return <Assignment {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    if (type === 'goal')
        return <Goal {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    if (type === 'tag')
        return <Tag {...propsReference} action={action} selectableModel={selectableModel} exFunction={exFunction} />
    
    return null
}

export default ModelSwitcher