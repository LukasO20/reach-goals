import { filterServiceFnMap } from './mapping/mappingUtilsProvider.js'

/**
 * @param {Object} filter 
 * @param {'find' | 'some'} type 
 */

export const validFilter = (filter, type = 'find') => {
    if (!filter) return false

    return Object.entries(filter)[type](
        ([key, value]) =>
            (typeof value === 'number' || value === 'all') &&
            filterServiceFnMap[key]
    )
}