import React, { useContext } from 'react'
import ButtonAction from './ButtonAction'
import { ManageModelContext } from '../../../../provider/components/ManageModelProvider'

//const [selectedValue, setSelectedValue] = useState(null)

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

const dropdownValue = (event) => {
    const value = event.target.getAttribute('datavalue')
    if (value) setSelectedValue(value)
}

const Dropdown = (props) => {
    const { setSelectModel } = useContext(ManageModelContext)
    const nullModal = () => { setSelectModel(null) }
    const dropdownStatus = props.parent.includes('goal-status') || props.parent.includes('assignment-status')
   
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
                                        <ButtonAction onClick={nullModal} datavalue={dropdownStatus ? option.op : null} target={targetMap(['panel-center', `${option.op}`])} classBtn={`form-${option.op} button-st`} iconFa='fa-solid fa-plus' title={`${option.title}`}/>
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