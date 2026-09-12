/**
 * @typedef {Object} ModelsProps
 * @property {Array} goal
 * @property {Array} assignment
 */

/**
 * @typedef {Object} UseTransformModelProps
 * @property {ModelsProps} source
 * @property {'progress' | 'conclude' | 'cancel'} [byStatus]
 * @property {'tags'} [byAttr]
 */

/**
 * @param {UseTransformModelProps} props
 * @returns {ModelsProps}
 */
export const useTransformModel = ({ source = {}, byStatus, byAttr }) => {
    const { goal = [], assignment = [] } = source
    const validGetter = (byStatus || byAttr)
    return {
        goal: validGetter ? goal.filter((item) =>
            item.status === byStatus || !!(item[byAttr]?.length ?? item[byAttr])
        ) : [],
        assignment: validGetter ? assignment.filter((item) =>
            item.status === byStatus || !!(item[byAttr]?.length ?? item[byAttr])
        ) : []
    }
}