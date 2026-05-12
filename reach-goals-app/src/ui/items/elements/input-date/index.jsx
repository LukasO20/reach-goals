import { DatePicker } from 'react-datepicker'

import './style.scss'

/** @typedef {import('./types.js').InputDateProps} Props */

/**
 * @param {Props} props
 */
const InputDate = ({ selected, id, className, name, onChange }) => {
    const handleChange = (newDate) => {
        if (newDate instanceof Date) {
            const fakeTarget = { target: { name: name, value: newDate.toISOString() } }
            onChange({ ...fakeTarget }) // execute external function from 'onChange' external attribute    
        }
    }

    return (
        <DatePicker
            id={id}
            className={className}
            selected={selected ? new Date(selected) : null}
            name={name}
            onChange={handleChange}
            formatWeekDay={(nameOfDay) => {
                return nameOfDay.substring(0, 3).toUpperCase()
            }}
            dateFormat='dd/MM/yyyy'
            placeholderText='set dd/mm/yyyy'
        />
    )
}

export default InputDate