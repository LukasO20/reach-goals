/** @import * as React from 'react' */

/** * @typedef {import('../../../../utils/types.js').ModelProps} ModelProps */

/**
 * @typedef {React.Dispatch<React.SetStateAction<ModelProps>>} SetModelProps
 */

/**
 * @callback SaveGoalProps
 * @param {Object} params
 * @returns {void}
 */

/**
 * @callback SaveAssignmentProps
 * @param {Object} params
 * @returns {void}
 */

/**
 * @typedef {Object} MonthDaysPickerProps
 * @property {Object} data
 * @property {Array} [data.goal]
 * @property {Array} [data.assignment]
 */

/**
 * @typedef {Object} MonthsDaysTitleProps
 * @property {string} title
 * @property {Date} startDate
 */

/**
 * @typedef {Object} MonthDaysFormProps
 * @property {ModelProps} model
 * @property {Date} startDate
 * @property {SetModelProps} setModel
 * @property {SaveGoalProps} saveGoal
 * @property {SaveAssignmentProps} saveAssignment
 * @property {boolean} pendingState
 */

export {}