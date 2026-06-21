import { useRef, useState } from 'react'

import './style.scss'

/** @typedef {import('./types.js').TooltipProps} Props */

/**
 * @param {Props} props
 */
const Tooltip = ({
    title,
    children,
    positions = {},
    delay = 500,
}) => {
    const [visible, setVisible] = useState(false)
    const timeoutRef = useRef(null)

    const defaultPosition = {
        left: '50%',
        top: 'calc(100% + .5rem)',
        transform: 'translateX(-50%)',
    }
    
    const handleShow = () => timeoutRef.current = setTimeout(() => { setVisible(true) }, delay)

    const handleHide = () => {
        clearTimeout(timeoutRef.current)
        setVisible(false)
    }

    const hasPosition = Object.keys(positions).length > 0
    const hasTitle = !!title?.trim()
    const positionsValue = hasPosition ? positions : defaultPosition

    return (
        <div
            className='tooltip'
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
            onFocus={handleShow}
            onBlur={handleHide}
        >
            {children}
            {visible && hasTitle && (
                <div
                    className='tooltip-content'
                    style={{ ...positionsValue }}
                >
                    {title}
                </div>
            )}
        </div>
    )
}

export default Tooltip