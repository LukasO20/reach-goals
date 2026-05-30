/**
 * @typedef {Object} GetDaysInMonthParams
 * @property {number} year
 * @property {number} month
 */

/**
 * @callback GetDaysInMonthProps
 * @param {GetDaysInMonthParams} params
 * @returns {Array<Date>}
 */

/**
 * @typedef {Object} SwitchMonthsContext
 * @property {Array<Date>} days
 * @property {string} monthLabel
 * @property {Date} activeDate
 * @property {() => void} nextMonth
 * @property {() => void} previousMonth
 */

export {}