import { useContext } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mappingUtils.js'

import ButtonAction from './ButtonAction'

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
    } /*else if (type === 'reminder') {
        return Array.from({ length: 30 }, (_, index) => ({
            op: `day-${index + 1}`,
            title: `${index + 1} day`
        }))
    }*/
}

const NullObject = (value) => {
    return (Array.isArray(value) || typeof value === "string") && value.length !== 0
}

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { setModel } = useContext(ManageModelContext)

    const target = props.target ?? { class: [] }
    const typeClass = target.class !== undefined ? target.class[0] : null
    const dropdownStatus = typeClass.includes('goal-status') || typeClass.includes('assignment-status')
    const reference = props?.reference

    let titleDropdown = undefined
    let optionsDropdown = undefined
    let classTargetDropdown = undefined

    const dropdownActionClick = (event) => {
        if (event.props) {
            const datavalue = event.props.datavalue
            if (typeof props.changeDropdownValue === 'function' && dropdownStatus) {
                props.changeDropdownValue({ name: 'status', value: datavalue })
            }

            if (typeClass === 'btn-action-create' && event.props.type === 'goal' || event.props.type === 'assignment') {
                setModel(prev => ({...prev, typeModel: event.props.type, mainModelID: null, submitModel: {} }))
            }
        }
    }

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
            /*case 'goal-reminder-date':
                titleDropdown = 'Select the day'
                optionsDropdown = mapOptionDropdown('reminder')
                break
            case 'assignment-reminder-date':
                titleDropdown = 'Select the day'
                optionsDropdown = mapOptionDropdown('reminder')
                break*/
        }
    }

    return (
        <span className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(target, e)} onKeyDown={(e) => e.key === 'Enter' ? toggleVisibility(target, e) : ''} role='button' tabIndex='0'>
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${visibleElements.includes(typeClass) ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <div className='dropdown-item item-element'>
                    <div className='section-options'>
                        {NullObject(titleDropdown) ? <span>{titleDropdown}</span> : ''}
                        {NullObject(optionsDropdown) ?
                            optionsDropdown.map((option, index) => {
                                switch (reference) {
                                    case 'panel-center':
                                        classTargetDropdown = [['panel-center', `${option.op}`]]
                                        break
                                    default:
                                        classTargetDropdown = [null, { remove: true }]
                                        break
                                }

                                return (
                                    <div className={`option ${option.op}`} key={`op-${index}`}>
                                        <div className='item-option'>
                                            <div className='item-title'>
                                                <ButtonAction onClick={dropdownActionClick} nullModel={true} datavalue={dropdownStatus ? option.op : null} target={targetMap(...classTargetDropdown)} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn={`form-${option.op} button-st`} iconFa='fa-solid fa-plus' title={`${option.title}`} type={option.op} />
                                            </div>
                                            <div className='item-details'>

                                            </div>
                                        </div>
                                        <div className='item-option-style'>

                                        </div>
                                    </div>
                                )
                            }) : undefined
                        }
                    </div>
                </div>
            </div>
        </span>
    )
}

export default ButtonDropdown