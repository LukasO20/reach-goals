import { filterServiceFnMap } from './mapping/mappingUtilsProvider.js'

export const validFilter = (filter) => {
    if (!filter) return false
    return Object.entries(filter).find(
        ([key, value]) =>
            (typeof value === 'number' || value === 'all') &&
            filterServiceFnMap[key]
    )
}