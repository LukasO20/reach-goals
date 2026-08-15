/** * @typedef {import('../../../provider/model/demo-session-provider/types.js').DemoVisitorProps} DemoVisitorProps */

/**
 * @callback LogoutSessionProps
 * @param {string | number} demoVisitorId
 * @returns {void}
 */

/**
 * @typedef {Object} ContainerHeaderProps
 * @property {DemoVisitorProps} visitor
 * @property {boolean} mutationLoading
 * @property {LogoutSessionProps} logoutSession
 */

export {}
