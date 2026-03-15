import Assignment from './Assignment/Assignment.jsx'
import Goal from './Goal/Goal.jsx'
import Tag from './Tag/Tag.jsx'

export const ModelSwitchMap = {
    type: '',
    propsReference: null,
    selectableModel: false,
}

const ModelSwitcher = ({ type, propsReference, selectableModel } = ModelSwitchMap) => {
    if (type === 'assignment')
        return <Assignment {...propsReference} selectableModel={selectableModel} />
    if (type === 'goal')
        return <Goal {...propsReference} selectableModel={selectableModel} />
    if (type === 'tag')
        return <Tag {...propsReference} selectableModel={selectableModel} />
    
    return null
}

export default ModelSwitcher