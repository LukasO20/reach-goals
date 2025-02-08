import React, { useContext } from 'react'
import { VisibilityContext } from '../../../../provider/components/VisibilityProvider'

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
    } else if (type === 'reminder') {
        return Array.from({ length: 30 }, (_, index) => ({
            op: `day-${index + 1}`,
            title: `${index + 1} day`
        }))
    }
}

const NullObject = (value) => {
    return (Array.isArray(value) || typeof value === "string") && value.length !== 0
}

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
    }
    return attributes
}

const ButtonDropdown = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const target = props.target ?? { class : [] }
    const typeClass = target.class !== undefined ? target.class[0] : null
    const dropdownStatus = typeClass.includes('goal-status') || typeClass.includes('assignment-status') 

    let titleDropdown = undefined
    let optionsDropdown = undefined

    // const [selectedValue, setSelectedValue] = useState('')
    // const [eventTarget, setEventTarget] = useState(null)

    const handleAction = (event) => {
        // console.log('EVENT - ', event)

        // if (event.props) {
        //     const datavalue = event.props.datavalue
        //     setSelectedValue(datavalue)
        //     setEventTarget(event)
        // }
    }

    // useEffect(() => {
    //     if (eventTarget?.e?.target) {
    //         const dropdownClosest = eventTarget.e.target.closest('.dropdown-form')

    //         if (dropdownClosest) {
    //             const inputClosest = dropdownClosest.querySelectorAll('#goal-status, #assignment-status')
            
    //             console.log(inputClosest)
    //             if (inputClosest) {
    //                 inputClosest.forEach(item => {
    //                     item.value = selectedValue

    //                     console.log('VALUE OF DROPDOWN INPUT - ', item.value)
    //                 })
    //             }
    //         }
    //     }
    // })

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
    
    console.log('PROPS - ', props.dropdownValue)

    return (        
        <label className={`${props.classBtn} button-st`} onClick={(e) => toggleVisibility(target, e)}> 
            {props.dataSelectable ? <input id={props.target.class} name='status' type='text' hidden /> : undefined }    
            <i className={`icon-st ${props.iconFa}`}></i>{props.title}
            <div className={`dropdown-menu ${ visibleElements.includes(typeClass) ? 'show' : '' }`} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <div className='dropdown-item item-element'>
                    <div className='section-options'>
                        { NullObject(titleDropdown) ? <span>{titleDropdown}</span> : ''}
                        { NullObject(optionsDropdown) ?
                            optionsDropdown.map((option, index) => {                      
                                return (
                                    <div className={`option ${option.op}`} key={`op-${index}`}>
                                        <div className='item-option'>                                  
                                            <div className='item-title'>
                                                <ButtonAction onClick={handleAction} datavalue={dropdownStatus ? option.op : null} target={targetMap(['panel-center', `${option.op}`])} classBtn={`form-${option.op} button-st`} iconFa='fa-solid fa-plus' title={`${option.title}`}/>
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
        </label>
    )
}

export default ButtonDropdown