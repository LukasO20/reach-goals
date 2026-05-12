/**
 * @typedef {Object} FormProps
 * @property {'goal'|'assignment'|'tag'} typeForm
 * @property {Object} functionFormMap
 * @property {Object} model
 * @property {boolean} [pendingState]
 */

/**
 * @typedef {Object} ModelRelationAddProps
 * @property {import('react').ReactNode} children
 * @property {'goal'|'assignment'|'tag'} type
 */

/**
 * @typedef {Object} FormTagProps
 * @property {'goal'|'assignment'|'tag'} type
 * @property {Object} functionFormMap
 * @property {Function} [functionFormMap.mapHandleChange]
 * @property {Function} [functionFormMap.mapHandleSubmit]
 * @property {Object} model
 * @property {Object} model.formModel
 * @property {boolean} [pendingState]
 */

/**
 * @typedef {Object} FormStandardProps
 * @property {'goal'|'assignment'|'tag'} type
 * @property {Object} functionFormMap
 * @property {Function} [functionFormMap.mapToggleVisibility]
 * @property {Function} [functionFormMap.mapHandleChange]
 * @property {Function} [functionFormMap.mapModelRelationAddMap]
 * @property {Function} [functionFormMap.mapHandleSubmit]
 * @property {Function} [functionFormMap.mapSetError]
 * @property {Object} model
 * @property {Object} model.formModel
 * @property {Object} [booleanFormMap]
 * @property {boolean} [pendingState]
 */

export {}