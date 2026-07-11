import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'

/** @typedef {import('../types.js').DropdownVisibilityCountProps} Props */

/**
 * @param {Props} props
 */
const DropdownVisibilityCount = ({ tagsCard, status = [] }) => {
    const { data } = useSwitchLayout()

    const isValidTagsCard = tagsCard !== false && data.layout.page.pageName !== 'calendar'
    const count = status.length + (isValidTagsCard ? 1 : 0)

    return (
        <span className='visibility-count'>
            {count}
        </span>
    )
}

export default DropdownVisibilityCount