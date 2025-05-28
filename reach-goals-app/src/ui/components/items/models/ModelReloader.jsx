import Assignment from './Assignment'
import Goal from './Goal'
import Tag from './Tag'

const ReloaderModel = (props) => {
    const type = props?.type
    const idReference = props?.idReference
    const propsReference = props?.propsReference

    console.log('PROPS RELOADER - ', props)
    switch (type) {
        case 'goal':
            return <Goal {...propsReference} />
        case 'goal-relation':
            return <Assignment {...propsReference} />
        case 'assignment':
            return <Assignment {...propsReference} />
        case 'assignment-relation':
            return <Goal {...propsReference} />
        case 'tag':
            return <Tag {...propsReference} />
        default:
            return null
    }
}

export default ReloaderModel