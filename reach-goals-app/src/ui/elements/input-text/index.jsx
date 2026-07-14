import { useState } from 'react'

import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').InputTextProps} Props */

/**
 * @param {Props} props
 */
const InputText = ({ id, className, placeholder, name, value, onChange, errorMessage, ...rest }) => {
  const [valueText, setValueText] = useState(undefined)

  const handleChange = (e) => {
    const { value } = e.target

    setValueText(value)

    onChange?.({
      target: { name: name, value: value }
    })
  }

  const hasErrorMessgae = !!errorMessage

  const inputTextClass = cx(
    `input-text
    ${className}
    ${hasErrorMessgae && 'error'}
    `
  )

  return (
    <div className='input-text-container'>
      <input
        id={id}
        className={inputTextClass}
        placeholder={placeholder}
        value={valueText ?? value}
        type='text'
        onChange={handleChange}
        {...rest}
      />
      {hasErrorMessgae && <label className='input-text-error'>{errorMessage}</label>}
    </div>
  )
}

export default InputText