import { iconMap } from "../../../../../utils/mapping/mappingIcons.jsx"
import './style.scss'

/** @typedef {import('./types.js').CardMiniTagProps} Props */

/**
 * @param {Props} props
 */
const CardMiniTag = ({ tags = [], quantity = 3 }) => {
    return (
        <div className='card-mini-tag'>
            {tags.slice(0, quantity).map(data => {
                if (data) {
                    const styleProps = { backgroundColor: `${data.tag.color}30`, borderColor: data.tag.color }
                    return (
                        <label key={data.tag.name} style={styleProps}>
                            {data.tag.name}
                        </label>
                    )
                }
                return null
            })}
            {tags.slice(quantity).length > 0 && (
                <label className='count'>
                    <span className='icon-st'>{iconMap['plus']}</span>
                    {tags.slice(quantity).length}
                </label>
            )}
        </div>
    )
}

export default CardMiniTag