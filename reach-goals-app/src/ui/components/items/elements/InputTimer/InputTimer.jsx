import { useState } from 'react'
import moment from 'moment'

const InputTimer = ({ name, onChange }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)

    const m = moment(e.target.value, 'HH:mm:ss', true)

    if (m.isValid()) {
      const totalMinutes = m.hours() * 60 + m.minutes() + Math.floor(m.seconds() / 60)

      if (typeof onChange === 'function') {
        const fakeTarget = { target: { name, value: totalMinutes } }
        onChange(fakeTarget)
      }
    }
  }

  return (
    <input
      type='text'
      name={name}
      value={value}
      onChange={handleChange}
      placeholder='hh:mm:ss'
      autoComplete='off'
    />
  )
}

export default InputTimer
