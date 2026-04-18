import { useState } from 'react'

import './style.scss'

/** @typedef {import('./types.js').InputTextProps} Props */

/**
 * @param {Props} props
 */
const InputText = ({ id, className, placeholder, name, value, onChange }) => {
  const [valueText, setValueText] = useState(undefined)

  const handleChange = (e) => {
    const { value } = e.target

    setValueText(value)

    onChange?.({
      target: { name: name, value: value }
    })
  }

  return (
    <input
      id={id}
      className={className}
      placeholder={placeholder}
      value={valueText ?? value}
      type='text'
      onChange={handleChange}
    />
  )
}

export default InputText