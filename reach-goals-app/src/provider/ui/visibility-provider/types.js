/**
 * @typedef {Object} VisibilityOperatorProps
 * @property {boolean} add
 * @property {boolean} remove
 * @property {boolean} maintain
 */

/**
 * @typedef {Object} VisibilityParams
 * @property {Array<string> | null} classTarget
 * @property {VisibilityOperatorProps} operator
 */

/**
 * @callback VisibleElementUpdaterProps
 * @param {Array<string>} prev
 * @returns {Array<string>}
 */

/** 
 * @typedef {[Array<string>, React.Dispatch<React.SetStateAction<Array<string>>>]} SetVisibleElementStateProps 
 */

/**
 * @callback SetSafeVisibleElementProps
 * @param {VisibleElementUpdaterProps} updateFn
 * @returns {void}
 */

/**
 * @callback UpdateVisibilityProps
 * @param {Array<string>} prev
 * @param {VisibilityParams} params
 * @returns {Array<string>}
 */

/**
 * @callback RemoveVisibilityProps
 * @param {Array<string>} prev
 * @param {VisibilityParams} params
 * @returns {Array<string>}
 */

/**
 * @callback ToggleVisibilityProps
 * @param {VisibilityParams} [params]
 * @param {Event} [event]
 * @returns {void}
 */

/**
 * @typedef {Object} VisibilityContextValue
 * @property {Array<string>} visibleElements
 * @property {ToggleVisibilityProps} toggleVisibility
 */

export { }