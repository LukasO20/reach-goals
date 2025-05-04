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

export { targetMap, switchLayoutMap }