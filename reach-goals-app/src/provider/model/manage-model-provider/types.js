/** @import * as React from 'react' */

/** * @typedef {import('../../../utils/types.js').ModelProps} ModelProps */

/**
 * @typedef {[ModelProps, React.Dispatch<React.SetStateAction<ModelProps>> ]} SetModelStateProps
 */

/**
 * @typedef {React.Dispatch<React.SetStateAction<ModelProps>>} SetModelProps
 */

/**
 * @typedef {Object} AddToSelectedModelParams
 * @property {string | number} id
 * @property {string} name
 * @property {'goal' | 'assignment' | 'tag'} type
 * @property {string} color
 * @property {Object} custom
 */

/**
 * @callback AddToSelectedModelProps
 * @param {AddToSelectedModelParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} RemoveFromSelectedModelParams
 * @property {string | number} id
 * @property {'goal' | 'assignment' | 'tag'} type
 */

/**
 * @callback RemoveFromSelectedModelProps
 * @param {RemoveFromSelectedModelParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} UpdateFormModelParams
 * @property {string} keyObject
 * @property {*} value
 * @property {'single' | 'array'} [type]
 * @property {'add' | 'remove'} [action]
 */

/**
 * @callback UpdateFormModelProps
 * @param {UpdateFormModelParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} SetFilterModelParams
 * @property {Object} filter
 * @property {'goal' | 'assignment' | 'tag'} type
 */

/**
 * @callback SetFilterModelProps
 * @param {SetFilterModelParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} UpdateDataModelParams
 * @property {Array} data
 * @property {'goal' | 'assignment' | 'tag'} type
 * @property {'core' | 'support'} scope
 */

/**
 * @callback UpdateDataModelProps
 * @param {UpdateDataModelParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} ResetManageModelParams
 * @property {Array<
 *  'typeModel' |
 *  'mainModelID' |
 *  'selectedModel' |
 *  'dataModel' |
 *  'filter' |
 *  'activeModel'
 * >} [keys]
 */

/**
 * @callback ResetManageModelProps
 * @param {ResetManageModelParams} [params]
 * @returns {void}
 */

/**
 * @typedef {Object} ResetManageModelProps
 * @property {Array<
 *  'typeModel' |
 *  'mainModelID' |
 *  'selectedModel' |
 *  'dataModel' |
 *  'filter' |
 *  'formModel'
 * >} [keys]
 */

/**
 * @typedef {Object} ManageModelContextValue
 * @property {ModelProps} model
 * @property {SetModelProps} setModel
 * @property {AddToSelectedModelProps} addToSelectedModel
 * @property {RemoveFromSelectedModelProps} removeFromSelectedModel
 * @property {UpdateFormModelProps} updateFormModel
 * @property {SetFilterModelProps} setFilterModel
 * @property {UpdateDataModelProps} updateDataModel
 * @property {ResetManageModelProps} resetManageModel
 */

export { }

