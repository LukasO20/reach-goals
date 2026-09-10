/** * @typedef {import('../../../provider/model/demo-session-provider/types.js').DemoVisitorProps} DemoVisitorProps */
/** * @typedef {import('../../../provider/model/demo-session-provider/types.js').QuotaModelProps} QuotaModelProps */

/**
 * @callback LogoutSessionProps
 * @param {string | number} demoVisitorId
 * @returns {void}
 */

/**
 * @typedef {Object} ModalUserQuotaCardProps
 * @property {QuotaModelProps} quotaModel
 */

/**
 * @typedef {Object} ModalUserProps
 * @property {DemoVisitorProps} visitor
 * @property {boolean} mutationLoading
 * @property {LogoutSessionProps} logoutSession
 */

export {}
