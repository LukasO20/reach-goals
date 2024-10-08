import React from 'react'

import '../../styles/items/Elements.scss'

const ModalForm = (props) => {
    const typeForm = props.fromBtnClass.split('-')[1]

    return (
        <div className={`container-form-modal center-content ${props.fromBtnClass}`}> 
            <h1>Formulário</h1>
            <label className='field-form name'>
                <input id={`${typeForm}-name`} className='input-form' type="text" placeholder='Name...' />
            </label>
        </div>
    )
}

export default ModalForm