/**
 * @typedef {Object} ChartCardsStructure
 * @property {Array} goal
 * @property {Array} assignment
 */

/**
 * @typedef {Object} ChartCardsProps
 * @property {ChartCardsStructure} data
 */

/**
 * @typedef {Object} ModalChartCardsProps
 * @property {'progress' | 'check' | 'cancel' | 'tag'} icon
 * @property {string} title
 * @property {ChartCardsStructure} data
 */

/**
 * @typedef {Object} CardProps
 * @property {'progress' | 'conclude' | 'cancel' | 'tag'} type
 * @property {string} title
 * @property {number} quantity
 * @property {number} totalQuantity
 * @property {boolean} [renderBody]
 * @property {boolean} [isModalModelList]
 * @property {React.Dispatch<React.SetStateAction<ModalChartCardsProps>>} [onModalChartCards]
 * @property {function():void} [anchorCalculatePosition]
 */

export { }