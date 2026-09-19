/** @typedef {import('../../../provider/model/manage-model-provider/types.js').SetFilterModelProps} SetFilterModelProps */
/** @typedef {import('../../../provider/model/manage-model-provider/types.js').ResetManageModelProps} ResetManageModelProps */

/**
 * @typedef {Object} ModalTagWrapperProps
 * @property {string} modelID
 * @property {Object} filterModel
 * @property {SetFilterModelProps} setFilterModel
 * @property {ResetManageModelProps} resetManageModel
 */

/**
 * @typedef {Object} ModalTagProps
 * @property {string} modelID
 * @property {SetFilterModelProps} setFilterModel
 * @property {ResetManageModelProps} resetManageModel
 * @property {Function} onFilterTabs
 * @property {Object | null} filterTabs
 */

export {}
