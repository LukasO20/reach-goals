import { useState } from 'react'

const InputTimer = (props) => {
  const [valueTimer, setValueTimer] = useState(undefined)
  const valueLoaded = props.value

  const toMinutes = (timeStr) => {
    if (!timeStr) return 0
    const [hh = '0', mm = '0', ss = '0'] = timeStr.split(':')
    return parseInt(hh, 10) * 60 + parseInt(mm, 10) + Math.floor(parseInt(ss, 10) / 60)
  }

  const handleChange = (e) => {
    const { value } = e.target
    const raw = value.replace(/\D/g, '').slice(0, 6)

    let hh = raw.slice(0, 2)
    let mm = raw.slice(2, 4)
    let ss = raw.slice(4, 6)

    if (mm && parseInt(mm, 10) > 59) mm = '59'
    if (ss && parseInt(ss, 10) > 59) ss = '59'
    if (hh && parseInt(hh, 10) > 99) hh = '99'

    let formatted = hh
    if (mm) formatted += ':' + mm
    if (ss) formatted += ':' + ss

    setValueTimer(formatted)

    props.onChange?.({
      target: { name: props.name, value: toMinutes(formatted) }
    })
  }

  return (
    <input
      value={valueTimer ?? valueLoaded}
      type='text'
      placeholder='Set HH:mm:ss'
      onChange={handleChange}
    />
  )
}

export default InputTimer