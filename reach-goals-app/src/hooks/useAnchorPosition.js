import { useState, useCallback } from 'react'

/**
 * @typedef {Object} AnchorCoords
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {string} placement
 */

export const useAnchorPosition = () => {
    const [coords, setCoords] = useState(/** @type {AnchorCoords | null} */ (null))

    const calculatePosition = useCallback((anchorElement) => {
        if (!anchorElement) return

        const rect = anchorElement.getBoundingClientRect()
        
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY
        const scrollX = window.scrollX

        const hasSpaceBelow = (windowHeight - rect.bottom) > 250
        const placement = hasSpaceBelow ? 'bottom' : 'top'

        setCoords({
            x: rect.left + scrollX,
            y: placement === 'bottom' 
                ? rect.bottom + scrollY + 8 
                : rect.top + scrollY - 8,
            width: rect.width,
            placement
        })
    }, [])

    return { coords, calculatePosition }
}