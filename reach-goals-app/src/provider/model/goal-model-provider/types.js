/** @import * as React from 'react' */

/**
 * @typedef {Object} GoalModelStateProps
 * @property {Array<Object>} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

/**
 * @callback SaveGoalProps
 * @param {Object} params
 * @returns {void}
 */

/**
 * @typedef {Object} SaveGoalDragDropParams
 * @property {Object} data
 */

/**
 * @callback SaveGoalDragDropProps
 * @param {SaveGoalDragDropParams} params
 * @returns {void}
 */

/**
 * @typedef {string | number} RemoveGoalParams
 */

/**
 * @callback RemoveGoalProps
 * @param {RemoveGoalParams} id
 * @returns {void}
 */

/**
 * @callback ResetSaveGoalProps
 * @returns {void}
 */

/**
 * @typedef {Object} GoalModelContextValue
 * @property {GoalModelStateProps} page
 * @property {GoalModelStateProps} modal
 * @property {SaveGoalProps} save
 * @property {boolean} saving
 * @property {boolean} saveSuccess
 * @property {SaveGoalDragDropProps} saveDragDrop
 * @property {RemoveGoalProps} remove
 * @property {boolean} removeSuccess
 * @property {boolean} removing
 * @property {RemoveGoalParams | undefined} removingVariables
 * @property {ResetSaveGoalProps} resetSave
 */

export {}