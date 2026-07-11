/**
 * @typedef {Object} CardsStructure
 * @property {Array} goal
 * @property {Array} assignment
 */

/**
 * @typedef {Object} ChartCardsProps
 * @property {CardsStructure} data
 */

/**
 * @typedef {Object} ModalCardsProps
 * @property {'progress' | 'check' | 'cancel' | 'tag'} icon
 * @property {string} title
 * @property {CardsStructure} data
 */

/**
 * @typedef {Object} CardProps
 * @property {'progress' | 'conclude' | 'cancel' | 'tag'} type
 * @property {string} title
 * @property {number} quantity
 * @property {number} totalQuantity
 * @property {boolean} [renderBody]
 * @property {boolean} [isModalModelList]
 * @property {React.Dispatch<React.SetStateAction<ModalCardsProps>>} [onModalChartCards]
 * @property {function(React.RefObject<HTMLElement>):void} [anchorCalculatePosition]
 */

export { }