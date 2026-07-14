import { useState } from 'react'

import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').In} Props */

/**
 * @param {Props} props
 */
const InputColor = ({ id, className, placeholder, name, value, onChange, errorMessage, ...rest }) => {
    const [valueColor, setValueColor] = useState(undefined)

    const handleChange = (e) => {
        const { value } = e.target

        setValueColor(value)

        onChange?.({
            target: { name: name, value: value }
        })
    }

    const hasErrorMessgae = !!errorMessage

    const inputColorClass = cx(
        `input-color
        ${className}
        ${hasErrorMessgae && 'error'}
        `
    )

    return (
        <div className='input-color-container'>
            <div className='input'>
                <input
                    id={id}
                    className={inputColorClass}
                    placeholder={placeholder}
                    value={valueColor ?? value}
                    type='color'
                    onChange={handleChange}
                    style={{ borderColor: `${valueColor || '#000000'}` }}
                    {...rest}
                />
                <span>{valueColor ?? value}</span>
            </div>
            {hasErrorMessgae && <label className='input-color-error'>{errorMessage}</label>}
        </div>
    )
}

export default InputColor