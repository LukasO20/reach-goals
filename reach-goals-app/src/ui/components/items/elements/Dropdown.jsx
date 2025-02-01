import React, { useContext, useState } from 'react'
import ButtonAction from './ButtonAction'
import { ManageModelContext } from '../../../../provider/components/ManageModelProvider'

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
    const [selectedValue, setSelectedValue] = useState(null)
    const { setSelectModel } = useContext(ManageModelContext)
    //const nullModal = () => { setSelectModel(null) } útil para exibir o MODAL (conferir novo método dentro dos button do dropdown)
    const dropdownStatus = props.parent.includes('goal-status') || props.parent.includes('assignment-status')
 
    const handleAction = (event) => {
        if (event.props) {
            const datavalue = event.props.datavalue
            setSelectedValue(datavalue)
        }

        if (event.e && selectedValue) {
            const dropdownClosest = event.e.target.closest('.dropdown-form')
            const inputClosest = dropdownClosest.querySelector('#goal-status')
        }
    }

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
    )
}

export default Dropdown