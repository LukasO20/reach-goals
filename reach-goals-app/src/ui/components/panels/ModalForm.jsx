import React from 'react'

import Button from '../../components/items/elements/Button'
import ButtonDropdown from '../../components/items/elements/ButtonDropdown'

import '../../styles/items/Elements.scss'

const iconMap = {
    assignment: 'fa-solid fa-list-check',
    goal: 'fa-solid fa-bullseye'
}

const titleMap = {
    assignment: 'Create your assignment',
    goal: 'Create your goal'
}

const formsMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
        <label className='field-forms timer'>
            <input id={`${typeForm}-timer`} className='input-form' type="text" placeholder='set timer' />
        </label>  
        : undefined

    return form
}

const ModalForm = (props) => {
    const typeForm = props.type
    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'
    const titleForm = titleMap[typeForm] || 'Create your objective'

    return (
        <div className={`container-form-modal center-content`}>
            <div className='head'> 
                <div className='objective-icon'>
                    <i className={icon}></i>
                </div>
                <div className='objective-options'> 
                    <div className='objective-op'>
                        <Button classBtn='op-form-assignment button-st' title='assingments'/>
                        <Button classBtn='op-form-goal button-st' title='goals'/>
                    </div>
                    <div className='objective-color'>
                        <label className='color'></label>
                    </div>
                </div>
            </div>
            <div className='body'>
                <h2>{titleForm}</h2>
                <div className='objective-forms'>
                    <label className='field-forms name'>
                        <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name...`} />
                    </label>
                    <label className='field-forms start-date'>
                        <input id={`${typeForm}-start-date`} className='input-form' type='text' placeholder='set start date' />
                    </label>
                    <label className='field-forms end-date'>
                        <input id={`${typeForm}-end-date`} className='input-form' type='text' placeholder='set end date' />
                    </label>
                    {/* DROPDOWN BUTTON HERE */}
                    <ButtonDropdown classBtn='dropdown-form' title='choose an option' />
                    <label className='field-forms reminder-date'>
                        <input id={`${typeForm}-reminder-date`} className='input-form' type='text' placeholder='set reminder date' />
                    </label>
                    {formsMap(typeForm)}
                </div>
            </div>
        </div>
    )
}

export default ModalForm