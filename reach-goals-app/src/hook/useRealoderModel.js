import Assignment from '../ui/components/items/models/Assignment'
import Goal from '../ui/components/items/models/Goal'
import Tag from '../ui/components/items/models/Tag'

const useReloaderModel = (type, globalReference, props) => {
    switch (type) {
        case 'goal':
            return <Goal key={globalReference} {...props} />
        case 'goal-relation':
            return <Assignment key={globalReference} {...props} />
        case 'assignment':
            return <Assignment key={globalReference} {...props} />
        case 'assignment-relation':
            return <Goal key={globalReference} {...props} />
        case 'tag':
            return <Tag key={globalReference} {...props} />
        default:
            return null
    }
}

export { useReloaderModel }