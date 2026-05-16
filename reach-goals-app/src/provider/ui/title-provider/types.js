/** @import * as React from 'react' */

/**
 * @typedef {Object} TitleStateProps
 * @property {string} header
 * @property {string | null} toast
 */

/**
 * @typedef {Object} UpdateTitleParams
 * @property {string} [header]
 * @property {string | null} [toast]
 */

/**
 * @callback UpdateTitleProps
 * @param {UpdateTitleParams} params
 * @returns {void}
 */

/**
 * @typedef {Object} TitleContextValue
 * @property {TitleStateProps} title
 * @property {UpdateTitleProps} update
 */

export {}