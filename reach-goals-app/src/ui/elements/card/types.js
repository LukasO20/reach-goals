/** @typedef {import('../../../utils/types.js').DisplayProps} DisplayProps */
/** @typedef {import('../../../utils/types.js').ClickFunctionProps} ClickFunctionProps */
/** @typedef {import('../../../utils/types.js').ModelTypeProps} ModelTypeProps */

/**
 * @typedef {Object} EndDateProps
 * @property {Date} end
 */

/**
 * @typedef {Object} RightContentProps
 * @property {ModelTypeProps} type
 * @property {Object} item
 * @property {DisplayProps} display
 * @property {boolean} [pendingState]
 * @property {ClickFunctionProps} [clickFunction]
 */

/**
 * @typedef {Object} CardProps
 * @property {ModelTypeProps} type
 * @property {DisplayProps} display
 * @property {Object} item
 * @property {Object} dragProvided
 * @property {boolean} [pendingState]
 * @property {boolean} [showTags]
 * @property {Object} [checkboxState]
 * @property {ClickFunctionProps} [clickFunction]
 */

export {}
