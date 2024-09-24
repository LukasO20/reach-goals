import React from 'react-dom'

const Dropdown = (title, option, description, style) => {
    return (
        <div className='dropdown'>
            {title !== undefined ? `<span>${title}</span>` : ''}
        </div>
    )
}

export default Dropdown