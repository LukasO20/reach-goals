import { useCheckbox } from '../../../../../provider/CheckboxProvider'

import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import '../ButtonCheckbox/ButtonCheckbox.scss'

const statusButton = (classBtn, dataCheckbox) => {
    return dataCheckbox.some(item => item.id === classBtn && item.value)
}

const ButtonCheckbox = ({ classBtn, checkbox = checkboxMap }) => {
    const isChecked = false
    const { toggleCheckbox } = useCheckbox()

    return (
        <span className={`${classBtn} button-st ${isChecked ? 'checked' : ''}`} 
            onClick={() => toggleCheckbox(checkbox)}
            onKeyDown={(e) => e.key === 'Enter' ? '' : ''}
            role='button' tabIndex='0'
        >
            <label className='checkbox-container'>
                <i className={`icon-st fa-solid ${isChecked ? 'fa-check' : ''}`}></i>
            </label>
        </span>
    )
}

export default ButtonCheckbox