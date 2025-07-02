const formatObject = (objectData) => {
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== "")
    )
}

const extractIds = (arr, key = 'id') => {
    if (!Array.isArray(arr)) return []
    return arr.map(item => typeof item === 'object' ? Number(item[key]) : Number(item))
}

export { formatObject, extractIds }