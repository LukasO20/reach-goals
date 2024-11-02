import React from 'react'

const modalItem = (type) => {
    switch (type) {
        case '':
            break
        case '':
            break
    }
}

const ModalConfigSection = (props) => {
    const typeSection = props.type

    return (
        <div className='section-modal config'>
            {modalItem(typeSection)}
        </div>
    )
}

export default ModalConfigSection