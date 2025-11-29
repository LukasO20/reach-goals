import { useState } from 'react'
import DurationPicker from 'react-duration-picker'

const InputTimer = () => {
  const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 })

  return (
    <div>
      <DurationPicker
        onChange={(newDuration) => setDuration(newDuration)}
        initialDuration={duration}
        maxHours={72}
        showSeconds={false}
      />
      <p>
        Time ready: {duration.hours}h {duration.minutes}m
      </p>
    </div>
  )
}

export default InputTimer