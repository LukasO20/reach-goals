/** @import * as React from 'react' */

/**
 * @typedef {Object} AssignmentModelStateProps
 * @property {Array<Object>} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

/**
 * @callback SaveAssignmentProps
 * @param {Object} params
 * @returns {void}
 */

/**
 * @typedef {Object} SaveDragDropAssignmentParams
 * @property {Array<Object>} data
 */

/**
 * @callback SaveDragDropAssignmentProps
 * @param {SaveDragDropAssignmentParams} params
 * @returns {void}
 */

/**
 * @typedef {string | number} RemoveAssignmentParams
 */

/**
 * @callback RemoveAssignmentProps
 * @param {RemoveAssignmentParams} params
 * @returns {void}
 */

/**
 * @callback ResetSaveAssignmentProps
 * @returns {void}
 */

/**
 * @typedef {Object} AssignmentModelContextValue
 * @property {AssignmentModelStateProps} page
 * @property {AssignmentModelStateProps} modal
 * @property {SaveAssignmentProps} save
 * @property {boolean} saving
 * @property {boolean} saveSuccess
 * @property {SaveDragDropAssignmentProps} saveDragDrop
 * @property {RemoveAssignmentProps} remove
 * @property {boolean} removeSuccess
 * @property {boolean} removing
 * @property {RemoveAssignmentParams | undefined} removingVariables
 * @property {ResetSaveAssignmentProps} resetSave
 */

export {}