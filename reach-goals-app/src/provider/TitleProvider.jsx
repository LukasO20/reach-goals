import { useState, useContext, createContext } from 'react'

const TitleContext = createContext()

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState(`Welcome. Let's produce?`)
    const update = (newTitle) => { setTitle(newTitle) }

    return (
       <TitleContext.Provider value={{title, update}}>
            {children}
       </TitleContext.Provider>
    )
}

export const useTitle = () => useContext(TitleContext)