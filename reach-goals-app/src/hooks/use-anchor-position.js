import { useState, useCallback } from 'react'

/**
 * @typedef {Object} AnchorCoords
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {'top' | 'bottom'} placementY
 * @property {'left' | 'right' | 'center'} placementX
 */

/**
 * @callback CalculatePositionFn
 * @param {HTMLElement} anchorElement
 * @param {HTMLElement} containerElement
 * @returns {void}
 */

export const useAnchorPosition = () => {
    const [coords, setCoords] = useState(/** @type {AnchorCoords | null} */(null))

    /** @type {CalculatePositionFn} */
    const calculatePosition = useCallback((anchorElement, containerElement) => {
        if (!anchorElement || !containerElement) return

        const rect = anchorElement.getBoundingClientRect()
        const containerRect = containerElement.getBoundingClientRect()
        const windowWidth = window.innerWidth

        const hasSpaceBelow = (window.innerHeight - rect.bottom) > 300
        const placementY = hasSpaceBelow ? 'bottom' : 'top'

        let placementX = 'left' 
        if (rect.left > windowWidth * 0.7) {
            placementX = 'right'
        } else if (rect.left > windowWidth * 0.3) {
            placementX = 'center'
        }

        setCoords({
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            placementY,
            placementX
        })
    }, [])

    return { coords, calculatePosition }
}