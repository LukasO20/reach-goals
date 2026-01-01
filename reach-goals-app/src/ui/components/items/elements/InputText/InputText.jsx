import { useState } from 'react'

import PropTypes from 'prop-types'

import './InputText.scss'

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

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default InputText