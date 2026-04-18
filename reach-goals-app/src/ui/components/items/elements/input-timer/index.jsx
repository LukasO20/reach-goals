import { useState } from 'react'

import './style.scss'

/** @typedef {import('./types.js').InputTimerProps} Props */

/**
 * @param {Props} props
 */
const InputTimer = ({ id, className, placeholder, name, value, onChange } = InputTimer) => {
  const [valueTimer, setValueTimer] = useState(undefined)

  const toTime = (minutes) => {
    if (!minutes && minutes !== 0) return ''
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const toMinutes = (timeStr) => {
    if (!timeStr) return 0
    const [hh = '0', mm = '0'] = timeStr.split(':')
    return parseInt(hh, 10) * 60 + parseInt(mm, 10)
  }

  const handleChange = (e) => {
    const { value } = e.target
    const raw = value.replace(/\D/g, '').slice(0, 4)

    let hh = raw.slice(0, 2)
    let mm = raw.slice(2, 4)

    if (mm && parseInt(mm, 10) > 59) mm = '59'
    if (hh && parseInt(hh, 10) > 99) hh = '99'

    let formatted = hh
    if (mm) formatted += ':' + mm

    setValueTimer(formatted)

    onChange?.({
      target: { name: name, value: toMinutes(formatted) }
    })
  }

  return (
    <input
      id={id}
      name={name}
      className={className}
      value={valueTimer ?? toTime(value)}
      type='text'
      placeholder={placeholder || 'Set HH:mm'}
      onChange={handleChange}
    />
  )
}

export default InputTimer