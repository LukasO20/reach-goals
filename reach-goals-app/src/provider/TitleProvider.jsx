import { useState, useContext, createContext } from 'react'

import { titleMap } from '../utils/mapping/mappingUtils'

const TitleContext = createContext()

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState(titleMap)
    const update = ({ header, toast }) => { 
        setTitle(prevTitle => ({
            ...prevTitle,
            header: header || `Welcome. Let's produce`,
            toast: toast
        })) 
    }

    return (
       <TitleContext.Provider value={{title, update}}>
            {children}
       </TitleContext.Provider>
    )
}

export const useTitle = () => useContext(TitleContext)