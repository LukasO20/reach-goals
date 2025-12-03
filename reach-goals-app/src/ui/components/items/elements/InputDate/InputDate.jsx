import { DatePicker } from 'react-datepicker'

import './InputDate.scss'

const InputDate = (props) => {
    const handleChange = (newDate) => {
        if (typeof props.onChange === 'function' && newDate instanceof Date) {
            const fakeTarget = { target: { name: props.name, value: newDate } }
            props.onChange({ ...fakeTarget }) // execute external function from 'onChange' external attribute    
        }
    }

    return (
        <DatePicker
            {...props}
            selected={props.selected ? new Date(props.selected) : null}
            onChange={handleChange}
            formatWeekDay={(nameOfDay) => {
                return nameOfDay.substring(0, 3).toUpperCase()
            }}
            dateFormat='dd/MM/yyyy'
            placeholderText='set dd/mm/yyyy'
            className='input-form'
        />
    )
}

export default InputDate