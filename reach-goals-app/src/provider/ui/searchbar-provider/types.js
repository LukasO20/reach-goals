/**
 * @typedef {Object} SearchBarResultProps
 */

/**
 * @typedef {Object} SearchBarDataProps
 * @property {Array<SearchBarResultProps>} results
 */

/**
 * @callback SearchBarSearchProps
 * @param {string} query
 * @returns {void}
 */

/**
 * @callback SearchBarResetProps
 * @returns {void}
 */

/**
 * @typedef {'idle' | 'pending' | 'success' | 'error'} SearchBarStatusProps
 */

/**
 * @typedef {Object} SearchBarContextValue
 * @property {SearchBarDataProps | undefined} data
 * @property {boolean} isSearching
 * @property {SearchBarSearchProps} search
 * @property {SearchBarResetProps} reset
 * @property {SearchBarStatusProps} status
 */

export {}