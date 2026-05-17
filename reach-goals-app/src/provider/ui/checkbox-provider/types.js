/** @import * as React from 'react' */

/**
 * @typedef {string | number} CheckboxIDProps
 */

/**
 * @typedef {Object} CheckboxRegistryProps
 * @property {Array<CheckboxIDProps>} page
 * @property {Array<CheckboxIDProps>} modal
 */

/**
 * @typedef {Object} CheckboxScopeProps
 * @property {Array<CheckboxIDProps>} selected
 */

/**
 * @typedef {Object} CheckboxProps
 * @property {CheckboxScopeProps} page
 * @property {CheckboxScopeProps} modal
 * @property {string} scope
 * @property {CheckboxIDProps} checkboxID
 * @property {CheckboxIDProps} checkboxIDMain
 * @property {CheckboxRegistryProps} checkboxRegistry
 */

/**
 * @typedef {[CheckboxProps, React.Dispatch<React.SetStateAction<CheckboxProps>> ]} SetCheckboxStateProps
 */

/**
 * @callback CheckboxUpdaterProps
 * @param {CheckboxProps} prev
 * @returns {CheckboxProps}
 */

/**
 * @callback SetSafeCheckboxProps
 * @param {CheckboxUpdaterProps} prev
 * @returns {void}
 */

/**
 * @callback UpdateCheckboxProps
 * @param {CheckboxProps} prev
 * @param {CheckboxProps} checkbox
 * @returns {CheckboxProps}
 */

/**
 * @callback RemoveCheckboxProps
 * @param {CheckboxProps} prev
 * @param {CheckboxProps} checkbox
 * @returns {CheckboxProps}
 */

/**
 * @callback ToggleCheckboxProps
 * @param {CheckboxProps} checkbox
 * @returns {void}
 */

/**
 * @callback RegisterCheckboxProps
 * @param {CheckboxIDProps} checkboxID
 * @param {'page' | 'modal'} scope
 * @returns {CheckboxProps}
 */

/**
 * @callback UnregisterCheckboxProps
 * @param {CheckboxIDProps} checkboxID
 * @param {'page' | 'modal'} scope
 * @returns {CheckboxProps}
 */

/**
 * @typedef {Object} ResetCheckboxProps
 * @property {Array<
 *  'page' |
 *  'modal' |
 *  'scope' |
 *  'checkboxID' |
 *  'checkboxIDMain' |
 *  'checkboxRegistry'
 * >} [keys]
 */

/**
 * @callback ResetCheckboxFunctionProps
 * @param {ResetCheckboxProps} props
 * @returns {void}
 */

/**
 * @typedef {Object} CheckboxContextValue
 * @property {CheckboxProps} valuesCheckbox
 * @property {SetSafeCheckboxProps} setSafeCheckbox
 * @property {RegisterCheckboxProps} registerCheckbox
 * @property {UnregisterCheckboxProps} unregisterCheckbox
 * @property {UpdateCheckboxProps} updateCheckbox
 * @property {RemoveCheckboxProps} removeCheckbox
 * @property {ToggleCheckboxProps} toggleCheckbox
 * @property {ResetCheckboxFunctionProps} resetCheckbox
 */

export {}