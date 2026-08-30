import './style.scss'

/** @typedef {import('./types.js').DotsProps & React.HTMLAttributes<HTMLDivElement>} ChartCardsProps  */

/**
 * @param {ChartCardsProps} props
 */
const Dots = ({ quantity, ...rest }) => {
    return (
        <div className='dots' {...rest}>
            {Array.from({ length: quantity }, () => (
                <span className='dot-item'></span>
            ))}
        </div>
    )
}

export default Dots
