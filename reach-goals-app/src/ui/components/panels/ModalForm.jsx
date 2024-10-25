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

const targetMap = (id, type, itself, maintain) => {
    const attributes = {
        idTarget: id ?? '',
        typeTarget: type ?? '',
        itself: itself ?? false,
        maintain: maintain ?? false
    }

    return attributes
}

const formsInputMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
        <div className='field-forms timer'>
            <input id={`${typeForm}-timer`} className='input-form' type="text" placeholder='set timer' />
        </div>  
        : undefined

    return form
}

const formsItemMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
    <div className='item-forms goal'>
        <div className='item-forms head'>
            <div className='item-head-1'>goals</div>
            <div className='item-head-2'></div>
        </div>
        <div className='item-forms body'>

        </div>
    </div>
    : 
    <div className='item-forms assignment'>
        <div className='item-forms head'>
            <div className='item-head-1'>assignments</div>
            <div className='item-head-2'></div>
        </div>
        <div className='item-forms body'>

        </div>
    </div>

return form
}

const ModalForm = (props) => {
    const typeForm = props.type
    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'
    const titleForm = titleMap[typeForm] || 'Create your objective'

    return (
        <div className='container-form-modal center-content'>
            <div className='head'> 
                <div className='objective-icon'>
                    <i className={icon}></i>
                </div>
                <div className='objective-options'> 
                    <div className='objective-op'>
                        <Button target={targetMap('panel-center', 'assingment', false, true)} classBtn='op-form-assignment button-st' title='assingments'/>
                        <Button target={targetMap('panel-center', '')} classBtn='op-form-goal button-st' title='goals'/>
                    </div>
                    <div className='objective-color'>
                        <label className='color'></label>
                    </div>
                </div>
            </div>
            <div className='body'>
                <h2>{titleForm}</h2>
                <div className='objective-forms'>
                    <div className='field-forms name'>
                        <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name...`} />
                    </div>
                    <div className='field-forms start-date'>
                        <input id={`${typeForm}-start-date`} className='input-form' type='text' placeholder='set start date' />
                    </div>
                    <div className='field-forms end-date'>
                        <input id={`${typeForm}-end-date`} className='input-form' type='text' placeholder='set end date' />
                    </div>
                    <div className='field-forms status'>
                        <ButtonDropdown target={targetMap(`${typeForm}-status`, '', true)} classBtn='dropdown-form' title='choose an option' />
                    </div>
                    <div className='field-forms reminder-date'>
                        <ButtonDropdown target={targetMap(`${typeForm}-reminder-date`, '', true)} classBtn='dropdown-form' title='choose an option' />
                    </div>
                    {formsInputMap(typeForm)}
                    <div className='item-forms tag'>
                        <div className='item-forms head'>
                            <div className='item-head-1'>tags</div>
                            <div className='item-head-2'></div>
                        </div>
                        <div className='item-forms body'>

                        </div>
                    </div>
                    {formsItemMap(typeForm)}
                    <div className='field-forms details'>
                        <textarea id={`${typeForm}-details`} className='input-form' placeholder='details here...'></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalForm