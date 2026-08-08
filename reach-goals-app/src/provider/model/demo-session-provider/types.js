/** @import * as React from 'react' */

/** * @typedef {import('../../../utils/types.js').DemoSessionSendCode} DemoSessionSendCodeProps */

/** * @typedef {import('../../../utils/types.js').DemoSessionVerification} DemoSessionVerificationrops */

/**
 * @typedef {Object} DemoVisitorProps
 * @property {string} name
 * @property {string} email
 * @property {'ACTIVE' | 'EXPIRED'} status
 */

/**
 * @typedef SendCodeReturns
 * @property {string} visitorName,
 * @property {string} visitorEmail,
 * @property {string} expiresAt,
 */

/**
 * @callback SendCodeProps
 * @param {DemoSessionSendCodeProps} params
 * @returns {SendCodeReturns}
 */

/**
 * @typedef VerifyDemoSessionReturns
 * @property {string} id,
 * @property {string} email,
 * @property {string} code,
 * @property {string} expiresAt,
 * @property {string} updatedAt,
 * @property {string} createdAt */

/**
 * @callback VerifyDemoSessionProps
 * @param {DemoSessionVerificationrops} params
 * @returns {VerifyDemoSessionReturns}
 */

/**
 * @typedef {Object} DemoSessionContextValue
 * @property {DemoVisitorProps} visitor
 * @property {VerifyDemoSessionProps} verifyDemoSession
 * @property {SendCodeProps} sendCode
 * @property {Error | null} mutationError
 * @property {boolean} mutationLoading
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

export {}
