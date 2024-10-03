import React from 'react'
import ReactDOM from 'react-dom'

const Config = (props) => {
    return ReactDOM.createPortal(
        <div className="container-config center-content">
            <h1>Configurations</h1>
        </div>
        , document.querySelector('.content-center')
    )
}

export default Config