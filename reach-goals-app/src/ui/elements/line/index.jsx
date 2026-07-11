import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').LineProps} Props */

/**
 * @param {Props} props
 */
const Line = ({ classLine, direction = 'horizontal' }) => {

    const lineClass = cx(
        `line
        ${classLine}
        ${direction}
        `
    )

    return (
        <div className={lineClass}></div>
    )
}

export default Line