import Assignment from './Assignment.jsx'
import Goal from './Goal.jsx'
import Tag from './Tag.jsx'

const ModelSwitcher = (props) => {
    const type = props?.type
    const propsReference = props?.propsReference
    const externalFunction = props?.exFunction
    const selectableModel = props?.selectableModel
    const action = props?.action

    switch (type) {
        case 'goal':
            return <Goal {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction}  />
        case 'goal-relation':
            return <Assignment {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
        case 'assignment':
            return <Assignment {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
        case 'assignment-relation':
            return <Goal {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} />
        case 'tag':
            return <Tag {...propsReference} action={action} selectableModel={selectableModel} exFunction={externalFunction} /> 
        default:
            return null
    }
}

export default ModelSwitcher