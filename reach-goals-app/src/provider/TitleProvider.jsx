import { useState, useContext, useCallback, useMemo, createContext } from 'react'

import { titleMap } from '../utils/mapping/mappingUtils'

const TitleContext = createContext()

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState(titleMap)
    const update = useCallback(({ header, toast }) => {
        setTitle(prevTitle => ({
            ...prevTitle,
            header: header || `Welcome. Let's produce`,
            toast
        }))
    }, [])

    const value = useMemo(() => ({ title, update }), [title, update])

    return (
        <TitleContext.Provider value={value}>
            {children}
        </TitleContext.Provider>
    )
}

export const useTitle = () => useContext(TitleContext)