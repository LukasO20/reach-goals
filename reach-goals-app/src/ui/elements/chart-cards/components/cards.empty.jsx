import Icons from '../../icons'

/** @typedef {import('../types.js').CardEmptyProps} Props */

/**
 * @param {Props} props
 */
const CardsEmpty = ({ message }) => {
    return (
        <div className='card-chart-empty'>
            <Icons icon='icon-exclamation' />
            <label className='message'>{message}</label>
        </div>
    )
}

export default CardsEmpty
