import { useState } from 'react'

import './style.scss'

/** @typedef {import('./types.js').TooltipProps} Props */

/**
 * @param {Props} props
 */
const Tooltip = ({ title, children, positions = {} }) => {
    const [visible, setVisible] = useState(false)

    if (!title) return children

    return (
        <div
            className='tooltip'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}

            {visible && (
                <div className='tooltip-content' style={{ ...positions }}>
                    {title}
                </div>
            )}
        </div>
    )
}

export default Tooltip