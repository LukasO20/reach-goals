import { useState, useEffect } from 'react'
import ButtonAction from '../ButtonAction/ButtonAction.jsx'

const NullObject = (props) => {
    if (props !== undefined) {
        const result = props.length !== 0 ? true : false
        return result

    } else { return false }
}

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
    }
    return attributes
}

const Dropdown = (props) => {
    const [selectedValue, setSelectedValue] = useState('')
    const [eventTarget, setEventTarget] = useState(null)

    const dropdownStatus = props.parent.includes('goal-status') || props.parent.includes('assignment-status') 

    const handleAction = (event) => {
        console.log('EVENT - ', event)

        if (event.props) {
            const datavalue = event.props.datavalue
            setSelectedValue(datavalue)
            setEventTarget(event)
        }
    }

    useEffect(() => {
        if (eventTarget?.e?.target) {
            const dropdownClosest = eventTarget.e.target.closest('.dropdown-form')

            if (dropdownClosest) {
                const inputClosest = dropdownClosest.querySelectorAll('#goal-status, #assignment-status')
            
                console.log(inputClosest)
                if (inputClosest) {
                    inputClosest.forEach(item => {
                        item.value = selectedValue

                        console.log('VALUE OF DROPDOWN INPUT - ', item.value)
                    })
                }
            }
        }
    })

    return (
        <div className='dropdown-item item-element'>
            <div className='section-options'>
                { NullObject(props) ? <span>{props.title}</span> : ''}
                { NullObject(props.options) ?
                    props.options.map((option, index) => {                      
                        return (
                            <div className={`option ${option.op}`} key={`op-${index}`}>
                                <div className='item-option'>                                  
                                    <div className='item-title'>
                                        <ButtonAction onClick={handleAction} datavalue={dropdownStatus ? option.op : null} target={targetMap(['panel-center', `${option.op}`])} classBtn={`form-${option.op} button-st`} icon='plus' title={`${option.title}`}/>
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
    )
}

export default Dropdown