/**
 * @typedef {Object} SearchProps
 * @property {'service' | 'ui'} [mode]
 * @property {string} [placeholder]
 */

/**
 * @typedef {Object} SearchBoxResultsProps
 * @property {Object} data
 * @property {Array} data.goals
 * @property {Array} data.assignments
 * @property {Array} data.tags
 * @property {boolean} [loading]
 * @property {string} [status]
 */

/**
 * @typedef {Object} SearchItemTagProps
 * @property {Object} item
 * @property {string} type
 * @property {function():void} [onButtonClick]
 */

/**
 * @typedef {Object} SearchItemProps
 * @property {Object} item
 * @property {string} type
 * @property {function():void} [onItemClick]
 * @property {function():void} [onButtonClick]
 */

export {}