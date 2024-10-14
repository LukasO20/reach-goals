import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

import Dropdown from '../../items/elements/Dropdown'

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    let titleDropdown = undefined
    let parentDropdown = props.id
    let optionsDropdown = undefined

    const defineDropdown = () => {
        switch (props.id) {
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
        <label className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(props.id, props.type, e)}>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(props.id) ? 'show' : '' }`} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <Dropdown title={titleDropdown} parent={parentDropdown} options={optionsDropdown}/>
            </div>
        </label>
    )
}

export default ButtonDropdown