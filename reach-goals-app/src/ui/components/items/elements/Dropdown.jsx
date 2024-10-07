import React from 'react'
import Button from '../../items/elements/Button'

const NullObject = (props) => {
    if (props !== undefined) {
        const result = props.length !== 0 ? true : false
        return result

    } else { return false }
}

const Dropdown = (props) => {
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
                                        <label><i className={`${option.iconFa}`}></i><span className='title'>{option.title}</span></label>
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