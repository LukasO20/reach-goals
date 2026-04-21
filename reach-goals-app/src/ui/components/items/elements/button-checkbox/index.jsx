import { useEffect } from 'react'

import { useCheckbox } from '../../../../../provider/ui/checkbox-provider.jsx'
import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import { cx } from '../../../../../utils/utils.js'

import './style.scss'

const stateCheckbox = (checkboxID, selected = []) => {
    return selected.includes(checkboxID)
}

const stateCheckboxMain = (selected = [], total = []) => {
    return selected.length > 0 && selected.length < total.length
}

/** @typedef {import('./types.js').ButtonCheckboxProps} Props */

/**
 * @param {Props} props
 */
const ButtonCheckbox = ({ classBtn, checkboxID, title, checkbox = checkboxMap }) => {
    const { valuesCheckbox, toggleCheckbox, registerCheckbox, unregisterCheckbox } = useCheckbox()
    const { data: { layout } } = useSwitchLayout()

    useEffect(() => {
        registerCheckbox(checkboxID)
        return () => unregisterCheckbox(checkboxID)
    }, [checkboxID])

    const checkboxMain = `checkbox-${layout.page.pageName}`
    const checkboxScope = valuesCheckbox.scope
    const isChecked = stateCheckbox(
        checkboxID,
        valuesCheckbox[checkboxScope]?.selected,
    )
    const isParcialChecked = stateCheckboxMain(
        valuesCheckbox[checkboxScope]?.selected,
        Array.from(valuesCheckbox.checkboxRegistry),
    )
    const isCheckboxMainID = checkboxMain === checkboxID

    const buttonCheckboxClass = cx(
        `button-checkbox
        ${classBtn} 
        ${isChecked && 'checked'} 
        `
    )

    return (
        <span className={buttonCheckboxClass}
            onClick={(e) => { toggleCheckbox(checkbox); e.stopPropagation() }}
            onKeyDown={(e) => e.key === 'Enter' ? toggleCheckbox(checkbox) : ''}
            role='button' tabIndex='0'
        >
            <label className='checkbox-container'>
                {
                    isCheckboxMainID && isParcialChecked ?
                        iconMap['square'] : isChecked ? iconMap['check'] : null
                }
            </label>
            {!!title && (
                <label className='title'>{title}</label>
            )}
        </span>
    )
}

export default ButtonCheckbox