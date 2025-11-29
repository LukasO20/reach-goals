import { useState } from 'react'
import { DatePicker } from 'react-datepicker'

import './InputDate.scss'

const InputDate = () => {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            formatWeekDay={(nameOfDay) => {
                return nameOfDay.substring(0, 3).toUpperCase()
            }}
            dateFormat='dd/MM/yyyy'
            placeholderText='Escolha a data'
        />
    )
}

export default InputDate