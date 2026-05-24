import { cx } from '../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').OverlayProps} Props */

/**
 * @param {Props} props
 */
const Overlay = ({ classOverlay }) => {

    const overlayClass = cx(
        `overlay
        ${classOverlay}
        `
    )

    return (
        <div className={overlayClass}></div>
    )
}

export default Overlay