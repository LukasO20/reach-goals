import Assignment from '../assignment'
import Goal from '../goal'
import Tag from '../tag'

import { safePropsReference, safeSelectableModel } from './defaults.js'

const ModelSwitcher = ({ 
    type, 
    propsReference = safePropsReference, 
    selectableModel = safeSelectableModel 
}) => {
    if (type === 'assignment')
        return <Assignment {...propsReference} selectableModel={selectableModel} />
    if (type === 'goal')
        return <Goal {...propsReference} selectableModel={selectableModel} />
    if (type === 'tag')
        return <Tag {...propsReference} selectableModel={selectableModel} />
    
    return null
}

export default ModelSwitcher