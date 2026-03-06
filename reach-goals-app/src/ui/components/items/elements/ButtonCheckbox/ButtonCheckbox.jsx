import { useCheckbox } from '../../../../../provider/CheckboxProvider'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import './ButtonCheckbox.scss'

const statusButton = (checkboxID, selected = []) => {
    return selected.includes(checkboxID)
}

const ButtonCheckbox = ({ classBtn, checkbox = checkboxMap }) => {
    const { valuesCheckbox, toggleCheckbox } = useCheckbox()

    const checkboxScope = valuesCheckbox.scope
    const checkboxID = valuesCheckbox.checkboxID
    const isChecked = statusButton(
        checkboxID, valuesCheckbox[checkboxScope]?.selected
    )

    return (
        <span className={`${classBtn} button-st ${isChecked ? 'checked' : ''}`} 
            onClick={() => toggleCheckbox(checkbox)}
            onKeyDown={(e) => e.key === 'Enter' ? toggleCheckbox(checkbox) : ''}
            role='button' tabIndex='0'
        >
            <label className='checkbox-container'>
                {isChecked ? iconMap['check'] : null}
            </label>
        </span>
    )
}

export default ButtonCheckbox