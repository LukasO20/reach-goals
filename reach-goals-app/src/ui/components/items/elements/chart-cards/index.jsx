/** @typedef {import('./types.js').ChartCardsProps} Props */

/**
 * @param {Props} props
 */
const ChartCards = ({ data, type }) => {
    return (
        <div className={`cards ${type}`}>
            {/* //TODO: SEND DATA TO EACH CARD FILTERED */}
        </div>
    )
}

export default ChartCards