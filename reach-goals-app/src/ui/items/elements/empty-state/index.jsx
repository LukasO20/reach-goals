import './style.scss'

/** @typedef {import('./types.js').EmptyStateProps} Props */

/**
 * @param {Props} props
 */
const EmptyState = ({ title, description, imgSrc, children }) => {
    return (
        <div className='empty-state'>
            <label className='title'>{title}</label>
            {description && <label className='description'>{description}</label>}
            {imgSrc && <img src={imgSrc} alt={title} />}
            {children}
        </div>
    )
}

export default EmptyState