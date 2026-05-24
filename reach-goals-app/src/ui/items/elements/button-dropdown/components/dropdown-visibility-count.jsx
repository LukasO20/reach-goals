/** @typedef {import('../types.js').DropdownVisibilityCountProps} Props */

/**
 * @param {Props} props
 */
const DropdownVisibilityCount = ({ tagsCard, status = [] }) => {

    const count = status.length + (tagsCard ? 1 : 0)

    return (
        <span className='visibility-count'>
            {count}
        </span>
    )
}

export default DropdownVisibilityCount