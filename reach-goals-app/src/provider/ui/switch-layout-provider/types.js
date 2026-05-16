
/** * @typedef {import('../../../utils/types.js').VisibilityConfigProps} VisibilityConfigProps */

/**
 * @typedef {Object} SetUserConfigLayoutParams
 * @property {'visibility'} type
 * @property {VisibilityConfigProps} data
 */

/**
 * @callback SetUserConfigLayoutProps
 * @param {SetUserConfigLayoutParams} params
 * @returns {void} 
 */

/**
 * @typedef {Object} SetLayoutProps
 * @property {LayoutProps} layout
 * @property {React.Dispatch<React.SetStateAction<Object>>} setLayout
 */

/**
 * @typedef {[SetLayoutProps, React.Dispatch<React.SetStateAction<SetLayoutProps>>]} SetLayoutStateProps 
 */

/**
 * @typedef {[VisibilityConfigProps, React.Dispatch<React.SetStateAction<VisibilityConfigProps>>]} SetVisibilityStateProps 
 */

/**
 * @typedef {Object} SwitcherProps
 * @property {string} area
 * @property {string} state
 */

/**
 * @callback UpdateProps
 * @param {SwitcherProps} switcher
 * @return {void}
 */

/**
 * @typedef {Object} SetSwitchLayoutParams
 * @property {'page' | 'modal'} area
 * @property {Object} state
 */

/**
 * @callback SetSwitchLayoutProps
 * @param {SetSwitchLayoutParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} LayoutPageProps
 * @property {string} pageName
 * @property {string} layoutName
 */

/**
 * @typedef {Object} LayoutModalProps
 * @property {string} modalName
 * @property {string} layoutName
 */

/**
 * @typedef {Object} LayoutProps
 * @property {LayoutPageProps} page
 * @property {LayoutModalProps} modal
 */

/**
 * @typedef {Object} OutputProps
 * @property {LayoutProps} layout
 * @property {VisibilityConfigProps} visibility
 */

/**
 * @typedef {Object} SwitchLayoutContextValue
 * @property {OutputProps} data
 * @property {SetUserConfigLayoutProps} setUserConfigLayout
 * @property {SetSwitchLayoutProps} setSwitchLayout
 */

export { }