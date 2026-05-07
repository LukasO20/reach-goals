import { useRef } from 'react'
import { useVisibility } from '../../../../../provider/ui/visibility-provider.jsx'
import { useOutsideClick } from '../../../../../hooks/useOutsideClick.js'

import ButtonAction from '../button-action/index.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import './style.scss'

/** @typedef {import('./types.js').CardMiniTagProps} Props */

/**
 * @param {Props} props
 */
const TagsPopover = ({ tags = [], visibility }) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const quantity = tags.length
    const tagsPopoverRef = useRef(null)

    const showPopover = visibleElements.includes(visibility)

    useOutsideClick(tagsPopoverRef ,() => {
        if (showPopover) toggleVisibility(visibilityMap(visibility))
    })

    return (
        <div className='tags-popover' ref={tagsPopoverRef}>
            {showPopover && (
                <div className='popover scrollable'>
                    {tags.map(data => {
                        if (data) {
                            const styleProps = { backgroundColor: `${data.tag.color}30`, borderColor: data.tag.color }
                            return (
                                <label key={data.tag.name} style={styleProps}>
                                    {iconMap['tag']}
                                    {data.tag.name}
                                </label>
                            )
                        }
                    })}
                </div>
            )}
            <div className='icon'>
                <span className='counter'>{quantity}</span>
                <ButtonAction classBtn='tag-popover circle small' icon='tag' visibility={visibilityMap(visibility)} />
            </div>
        </div>
    )
}

export default TagsPopover