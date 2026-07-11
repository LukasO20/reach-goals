import { useEffect } from 'react'

import { useCheckbox } from '../../../provider/ui/checkbox-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'

import { cx } from '../../../utils/utils.js'

import Icons from '../icons'

import './style.scss'

/** @typedef {import('./types.js').ButtonCheckboxProps} Props */

/**
 * @param {Props} props
 */
const ButtonCheckbox = ({ classBtn, checkboxID, title, checkbox }) => {
    const { valuesCheckbox, toggleCheckbox, registerCheckbox, unregisterCheckbox } = useCheckbox()
    const { data: { layout = {} } } = useSwitchLayout()

    const { page, modal} = layout

    const checkboxScope = valuesCheckbox.scope

    const typeCheckboxMain = checkboxScope === 'modal' ? modal?.layoutName : page?.layoutName

    const stateCheckbox = (checkboxID, selected = [], scope) => selected.includes(checkboxID) && scope === valuesCheckbox.scope

    const stateCheckboxMain = (selected = [], total = []) => selected.length > 0 && selected.length < total.length

    useEffect(() => {
        registerCheckbox(checkboxID, `${checkbox.scope}`)
        return () => unregisterCheckbox(checkboxID, `${checkbox.scope}`)
    }, [checkbox.scope, checkboxID, registerCheckbox, unregisterCheckbox])

    const checkboxMain = `checkbox-${typeCheckboxMain}`
    const isChecked = stateCheckbox(
        checkboxID,
        valuesCheckbox[checkboxScope]?.selected,
        checkbox?.scope
    )
    const isParcialChecked = stateCheckboxMain(
        valuesCheckbox[checkboxScope]?.selected,
        Array.from(valuesCheckbox.checkboxRegistry[checkbox.scope]),
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
            onClick={(e) => { 
                toggleCheckbox(checkbox); 
                e.stopPropagation() 
            }}
            onKeyDown={(e) => e.key === 'Enter' ? toggleCheckbox(checkbox) : ''}
            role='button' tabIndex='0'
        >
            <label className='checkbox-container'>
                {
                    isCheckboxMainID && isParcialChecked ?
                        <Icons icon='icon-square' /> : isChecked ? <Icons icon='icon-conclude' /> : null
                }
            </label>
            {!!title && (
                <label className='title'>{title}</label>
            )}
        </span>
    )
}

export default ButtonCheckbox