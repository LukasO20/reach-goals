import React, { useState } from 'react'

const ModalListContext = React.createContext()

const ModalListProvider = ({children}) => {
    const [modalList, setModalList] = useState(false)

    const hasValidProperties = (obj) => {
        if (!obj) { return false}
        return Object.keys(obj).some(key => obj[key] !== null && obj[key] !== undefined)
    }

    const handleModalList = (modalList, event) => {
        event.stopPropagation()

        if (!hasValidProperties(modalList)) { return console.error(`The object (${modalList}) is invalid.`) }

        const parameterTarget = {
            open: modalList?.open,
            type: modalList?.type
        }
        setModalList(parameterTarget)
    }

    console.log('LISTS - ', modalList)

    return (
        <ModalListContext.Provider value={{modalList, handleModalList}}>
            {children}
        </ModalListContext.Provider>
    )
}

export { ModalListContext, ModalListProvider }