/** * @typedef {import('../../../utils/types.js').ThemeType} ThemeTypeProps */

/**
 * @typedef {[ThemeTypeProps, React.Dispatch<React.SetStateAction<ThemeTypeProps>>]} SetThemeStateProps 
 */

/**
 * @typedef {Object} SetThemeParams
 * @property {ThemeTypeProps} theme
 */

/**
 * @callback SetThemeProps
 * @param {SetThemeParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {ThemeTypeProps} theme
 * @property {SetThemeProps} setTheme
 */

export {}