import React, { useState } from 'react'

const ModalListContext = React.createContext()

const ModalListProvider = ({children}) => {
    const [modalList, setModalList] = useState(false)

    const handleModalList = (modalList, event) => {
        //event.stopPropagation()
        console.log('HE CALL ME')
        const parameterTarget = {
            open: modalList?.open,
            type: modalList?.type
        }
        setModalList(parameterTarget)
    }

    return (
        <ModalListContext.Provider value={{modalList, handleModalList}}>
            {children}
        </ModalListContext.Provider>
    )
}

export { ModalListContext, ModalListProvider }