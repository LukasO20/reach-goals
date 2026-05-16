/** @import * as React from 'react' */

/**
 * @typedef {Object} TagModelStateProps
 * @property {Array<Object>} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

/**
 * @callback SaveTagProps
 * @param {Object} params
 * @returns {void}
 */

/**
 * @typedef {string | number} RemoveTagParams
 */

/**
 * @callback RemoveTagProps
 * @param {RemoveTagParams} id
 * @returns {void}
 */

/**
 * @callback ResetSaveTagProps
 * @returns {void}
 */

/**
 * @typedef {Object} TagModelContextValue
 * @property {TagModelStateProps} page
 * @property {TagModelStateProps} modal
 * @property {SaveTagProps} save
 * @property {boolean} saving
 * @property {boolean} saveSuccess
 * @property {RemoveTagProps} remove
 * @property {boolean} removeSuccess
 * @property {boolean} removing
 * @property {RemoveTagParams | undefined} removingVariables
 * @property {ResetSaveTagProps} resetSave
 */

export {}