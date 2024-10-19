import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

import Dropdown from '../../items/elements/Dropdown'

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const target = props.target ?? { idTarget: '', typeTarget: ''}

    let titleDropdown = undefined
    let parentDropdown = target.idTarget
    let optionsDropdown = undefined

    const defineDropdown = () => {
        switch (target.idTarget) {
            case 'btn-action2':
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
            case 'btn-action-objective1':
                titleDropdown = 'Select status'
                optionsDropdown = [
                    {
                        op: 'progress',
                        title: 'in progress'
                    }
                ]
        }
    }
    
    return (
        <label className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(target, e)}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(target.idTarget) ? 'show' : '' }`} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <Dropdown title={titleDropdown} parent={parentDropdown} options={optionsDropdown}/>
            </div>
        </label>
    )
}

export default ButtonDropdown