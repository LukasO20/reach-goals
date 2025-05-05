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

export { targetMap, switchLayoutMap, checkboxMap }