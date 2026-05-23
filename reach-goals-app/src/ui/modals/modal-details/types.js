/** @import * as React from 'react' */

/**
 * @typedef {Object} ModalDetailsProps
 * @property {number | string} modelID
 * @property {'goal' | 'assignment'} type
 */

/**
 * @typedef {Object} ModalDetailsGoalProps
 * @property {Array<Object>} [assignments]
 * @property {Array<Object>} [tags]
 */

/**
 * @typedef {Object} ModalDetailsAssignmentProps
 * @property {Number} [duration]
 * @property {Object} [goal]
 * @property {Array<Object>} [tags]
 */

/**
 * @typedef {Object} ModalDetailsTagRelationProps
 * @property {'goal' | 'assignment'} type
 * @property {Array<Object>} tags
 */

/**
 * @typedef {Object} ModalDetailsContentProps
 * @property {'goal' | 'assignment'} type
 * @property {string} name
 * @property {string} status
 * @property {Number} [duration]
 * @property {string} [description]
 * @property {string} [end]
 * @property {Array<Object>} [assignments]
 * @property {Array<Object>} [tags]
 * @property {Object} [goal]
 */

export {}