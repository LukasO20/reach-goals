import React from 'react'
import ReactDOM from 'react-dom'

const Dropdown = (title, option, description, style) => {
    return  ReactDOM.createPortal(
        <div className='dropdown-item item-element'>
            {title !== undefined ? `<span>${title}</span>` : ''}
        </div>, document.querySelector('.dropdown')
    )
}

export default Dropdown