import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

import Dropdown from '../../items/elements/Dropdown'

const mapOptionDropdown = (type) => {
    if (type === 'status') {
        return [
            {
                op: 'progress',
                title: 'in progress'
            },
            {
                op: 'conclude',
                title: 'concluded'
            },
            {
                op: 'cancel',
                title: 'canceled'
            },
        ]
    } else if (type === 'reminder') {
        return Array.from({ length: 30 }, (_, index) => ({
            op: `day-${index + 1}`,
            title: `${index + 1} day`
        }))
    }
}

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const target = props.target ?? { class : [] }
    const typeClass = target.class !== undefined ? target.class[0] : null
    
    let titleDropdown = undefined
    let parentDropdown = typeClass
    let optionsDropdown = undefined

    const defineDropdown = () => {
        switch (typeClass) {
            case 'btn-action-create':
                titleDropdown = 'Create objectives'
                optionsDropdown = [
                    {
                        op: 'goal',
                        iconFa: 'fa-solid fa-plus',
                        title: 'goal'
                    },
                    {
                        op: 'assignment',
                        iconFa: 'fa-solid fa-plus',
                        title: 'assignment'
                    }
                ]
                break
            case 'goal-status':
                titleDropdown = 'Select status'
                optionsDropdown = mapOptionDropdown('status')
                break
            case 'assignment-status':
                titleDropdown = 'Select status'
                optionsDropdown = mapOptionDropdown('status')
                break
            case 'goal-reminder-date':
                titleDropdown = 'Select the day'
                optionsDropdown = mapOptionDropdown('reminder')
                break
            case 'assignment-reminder-date':
                titleDropdown = 'Select the day'
                optionsDropdown = mapOptionDropdown('reminder')
                break
        }
    }
    
    return (
        <label className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(target, e)}> 
            {props.valueSelect ? <input id={props.target.class} value={props.valueSelect} name='status' type='text' disabled hidden /> : undefined }    
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(typeClass) ? 'show' : '' }`} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <Dropdown title={titleDropdown} parent={parentDropdown} options={optionsDropdown}/>
            </div>
        </label>
    )
}

export default ButtonDropdown