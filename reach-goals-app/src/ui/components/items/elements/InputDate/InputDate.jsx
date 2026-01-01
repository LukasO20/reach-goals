import { DatePicker } from 'react-datepicker'

import PropTypes from 'prop-types'

import './InputDate.scss'

const InputDate = ({ selected, id, className, name, onChange }) => {
    const handleChange = (newDate) => {
        if (typeof onChange === 'function' && newDate instanceof Date) {
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

InputDate.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default InputDate