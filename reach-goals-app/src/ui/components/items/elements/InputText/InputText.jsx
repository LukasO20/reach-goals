import { useState } from 'react'

import './InputText.scss'

export const InputTextMap = {
    id: null,
    className: '',
    placeholder: '',
    name: '',
    value: null,
    onChange: () => {}
}

/**
 * @param {Object} InputTextMap
 * @param {string|number|null} InputTextMap.id
 * @param {string} InputTextMap.className
 * @param {string} InputTextMap.placeholder
 * @param {string} InputTextMap.name
 * @param {string|number|null} InputTextMap.value
 * @param {Function} InputTextMap.onChange
 */

const InputText = ({ id, className, placeholder, name, value, onChange } = InputTextMap) => {
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