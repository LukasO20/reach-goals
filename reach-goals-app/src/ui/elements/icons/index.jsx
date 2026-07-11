import { cx } from '../../../utils/utils.js'
import { iconMap } from './components/icon-map.js'

import './style.scss'

/** @param {import('./types.js').Props} props */
const Icons = ({ icon, size, ...props }) => {
    const IconComponent = iconMap[icon]

    if (!IconComponent) return null

    const svgClass = cx(
        `icon-st
        ${size}`
    )

    return (
        <svg className={svgClass} viewBox='0 0 24 24' {...props}>
            <IconComponent />
        </svg>
    )
}

export default Icons