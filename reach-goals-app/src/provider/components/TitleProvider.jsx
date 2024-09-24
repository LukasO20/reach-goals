import React, { useState } from 'react'

const TitleContext = React.createContext()

const TitleProvider = ({children}) => {
    const [title, setTitle] = useState(`Welcome. Let's produce?`)
    const update = (newTitle) => { setTitle(newTitle) }

    return (
       <TitleContext.Provider value={{title, update}}>
            {children}
       </TitleContext.Provider>
    )
}

export { TitleContext, TitleProvider }