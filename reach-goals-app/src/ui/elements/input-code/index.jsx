import { useState, useRef } from 'react'

import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').InputCodeProps} Props */

/**
 * @param {Props} props
 */
const InputCode = ({
    id,
    className,
    title,
    name,
    value,
    length = 4,
    onChange,
    errorMessage,
    ...rest
}) => {
    const [code, setCode] = useState(Array(length).fill(''))
    const inputsRef = useRef([])

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const newCode = [...code]

        newCode[index] = value.slice(-1)
        const updatedCodeString = newCode.join('')

        setCode(newCode)
        onChange({
            target: {
                name,
                value: updatedCodeString,
            },
        })

        if (value && index < length - 1) inputsRef.current[index + 1].focus()
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData
            .getData('text')
            .slice(0, length)
            .split('')

        const newCode = Array(length).fill('')
        const updatedCodeString = newCode.join('')

        pastedData.forEach((char, index) => {
            newCode[index] = char
            if (inputsRef.current[index]) inputsRef.current[index].value = char
        })

        setCode(newCode)
        onChange({
            target: {
                name: e.target.name,
                value: updatedCodeString,
            },
        })

        const focusIndex = Math.min(pastedData.length, length - 1)
        inputsRef.current[focusIndex]?.focus()
    }

    const hasErrorMessgae = !!errorMessage

    const inputCodeClass = cx(
        `input-code
        ${className}
        ${hasErrorMessgae && 'error'}
        `
    )

    return (
        <div
            className='input-code-container'
            style={{ display: 'flex', gap: '10px' }}
            id={id}
        >
            {title && <label className='title'>{title}</label>}
            <div className='input'>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        className={inputCodeClass}
                        name={name}
                        type='text'
                        maxLength={1}
                        value={digit}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                    />
                ))}
            </div>
            {hasErrorMessgae && (
                <label className='input-code-error'>{errorMessage}</label>
            )}
        </div>
    )
}

export default InputCode
