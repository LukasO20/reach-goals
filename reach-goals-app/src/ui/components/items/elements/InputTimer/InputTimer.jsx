import { useState } from 'react'
import moment from 'moment'

const InputTimer = ({ value, name, onChange }) => {
  const [valueTimer, setValueTimer] = useState('')

  const toMinutes = (timeStr) => {
    if (!timeStr) return 0
    const [hh = '0', mm = '0', ss = '0'] = timeStr.split(':')
    return parseInt(hh, 10) * 60 + parseInt(mm, 10) + Math.floor(parseInt(ss, 10) / 60)
  }

  const maskTimer = (target) => {
    if (!target) return

    let raw = target.value.replace(/\D/g, '')
    if (raw.length > 6) raw = raw.slice(0, 6)

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
  }

  const handleChange = ({ target }) => {
    if (!target) return

    maskTimer(target)

    if (typeof onChange === 'function') {
      const fakeTarget = { target: { name, value: toMinutes(valueTimer) } }
      onChange({ ...fakeTarget }) // execute external function from 'onChange' external attribute     
    }
  }
  
  //TODO: Try test a storaged minutes and shoe here as format HH:mm:ss
  return (
    <div className='timer-container'>
      <input type='text' value={value} name={name} placeholder='Set HH:mm:ss' onChange={handleChange} />
      <label className='view-timer'>{valueTimer}</label>
    </div>
  )
}

export default InputTimer
