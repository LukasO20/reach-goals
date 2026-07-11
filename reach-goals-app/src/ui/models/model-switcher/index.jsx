import Assignment from '../assignment'
import Goal from '../goal'
import Tag from '../tag'

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