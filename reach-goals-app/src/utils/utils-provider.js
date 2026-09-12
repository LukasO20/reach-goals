import { filterServiceFnMap } from './mapping/mapping-utils-provider.js'

/**
 * @param {Object} filter
 * @param {'find' | 'some'} type
 */

export const validFilter = (filter, type = 'find') => {
    if (!filter) return false

    return Object.entries(filter)[type](
        ([key, value]) =>
            (typeof value === 'string' || typeof value === 'undefined') &&
            filterServiceFnMap[key]
    )
}

/**
 * @param {object} scopeFilter
 * @param {object} service
 */

export const createQueryFn = (scopeFilter, service) => {
    const valid = validFilter(scopeFilter)
    if (!valid) return () => Promise.resolve([])
    const [key, value] = valid
    const fnName = filterServiceFnMap[key]
    return () => service[fnName](value)
}
