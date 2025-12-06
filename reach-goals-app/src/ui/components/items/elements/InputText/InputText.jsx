import { useState } from 'react'

import './InputText.scss'

const InputText = (props) => {
  const [valueText, setValueText] = useState(undefined)
  const valueLoaded = props.value

  const handleChange = (e) => {
    const { value } = e.target

    setValueText(value)

    props.onChange?.({
      target: { name: props.name, value: value }
    })
  }

  return (
    <input
      {...props}
      value={valueText ?? valueLoaded}
      type='text'
      onChange={handleChange}
    />
  )
}

export default InputText