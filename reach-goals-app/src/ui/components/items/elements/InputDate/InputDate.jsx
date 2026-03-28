import { DatePicker } from 'react-datepicker'

import './InputDate.scss'

export const InputDateMap = {
    selected: null,
    id: null,
    className: '',
    name: '',
    onChange: () => {}
}

/**
 * @param {Object} InputDateMap
 * @param {Date|string|null} InputDateMap.selected
 * @param {string|number|null} InputDateMap.id
 * @param {string} InputDateMap.className
 * @param {string} InputDateMap.name
 * @param {Function} InputDateMap.onChange
 */

const InputDate = ({ selected, id, className, name, onChange } = InputDateMap) => {
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