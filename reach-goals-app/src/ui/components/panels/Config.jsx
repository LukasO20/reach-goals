import React from 'react'
import Button from '../items/elements/Button'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const Config = () => {
    return (
        <div className="container-config center-content">
            <div className='head'>
                <h2>Configurations</h2>
                <Button target={targetMap(null)} classBtn='button-action-p close-modal button-st' iconFa='fa-solid fa-xmark'/>
                </div>
            <div className='body'>
                <div className='aside-config'>

                </div>
                <div className='section-options-config'>

                </div>
            </div>
        </div>
    )
}

export default Config