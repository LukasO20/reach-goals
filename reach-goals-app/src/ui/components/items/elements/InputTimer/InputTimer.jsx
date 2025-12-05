import { useState, useEffect } from 'react'

const InputTimer = (props) => {
  const [valueTimer, setValueTimer] = useState('')

  const minutesToTime = (minutes) => {
    if (!minutes && minutes !== 0) return ''
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    const ss = '00'
    return `${hh}:${mm}:${ss}`
  }

  const toMinutes = (timeStr) => {
    if (!timeStr) return 0
    const [hh = '0', mm = '0', ss = '0'] = timeStr.split(':')
    return parseInt(hh, 10) * 60 + parseInt(mm, 10) + Math.floor(parseInt(ss, 10) / 60)
  }

  const handleChange = ({ target }) => {
    const raw = target.value.replace(/\D/g, '').slice(0, 6)

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

    if (typeof props.onChange === 'function') {
      props.onChange({
        target: { name: props.name, value: toMinutes(formatted) }
      })
    }
  }

  useEffect(() => {
    if (props.value !== undefined && props.value !== null) {
      setValueTimer(minutesToTime(props.value))
    }
  }, [props.value])

  return (
    <input
      value={valueTimer}
      type='text'
      placeholder='Set HH:mm:ss'
      onChange={handleChange}
    />
  )
}

export default InputTimer