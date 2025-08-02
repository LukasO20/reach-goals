const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const switchLayoutMap = (nameComponent, nameLayout, value) => {
    const attributes = {
        nameComponent: nameComponent,
        nameLayout: nameLayout,
        value: value
    }
    return attributes
}

const checkboxMap = (checkbox) => {
    const data = typeof checkbox === 'object' && checkbox !== null ? true : false  
    if (data) {
        const attributes = {
            id: checkbox.id,
            value: checkbox.value ?? false
        }

        return attributes
    }
    return null
}

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const buildQueryParamsMap = ({ IDobject, action }) => {
    if (typeof action !== 'string' || !action.trim()) return console.error('"action" must be a non-empty string')
    if (!IDobject || typeof IDobject !== 'object') return console.error('"IDobject" must be an object like { key: value }')

    const hasValidKey = Object.entries(IDobject).some(([k, v]) =>
        k.trim() !== '' && v !== undefined && v !== null && v !== ''
    )
    if (!hasValidKey) return console.error('"IDobject" must have at least one key with a non-empty value')

    return new URLSearchParams({
        action: action,
        ...IDobject
    }).toString()
}

export { targetMap, switchLayoutMap, checkboxMap, modalListMap, buildQueryParamsMap }