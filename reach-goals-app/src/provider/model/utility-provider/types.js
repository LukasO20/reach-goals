/**
 * @typedef {Object} SaveModelStatusParams
 * @property {Array<string | number>} data
 * @property {string} status
 */

/**
 * @callback SaveModelStatusProps
 * @param {SaveModelStatusParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} RemoveModelsParams
 * @property {Array<string | number>} ids
 */

/**
 * @callback RemoveModelsProps
 * @param {RemoveModelsParams} params
 * @returns {void}
 */


/**
 * @typedef {Object} UtilityContextValue
 * @property {SaveModelStatusProps} saveStatus
 * @property {boolean} savingStatus
 * @property {SaveStatusParams | undefined} savedStatusData
 * @property {RemoveModelsProps} removeModels
 * @property {boolean} removingModels
 */

export {}