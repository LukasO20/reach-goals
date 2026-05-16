import { useState, useContext, useCallback, useMemo, createContext } from 'react'

import { titleMap } from '../../../utils/mapping/mappingUtils'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').TitleContextValue} TitleContextValue */

/** @type {React.Context<TitleContextValue>} */
const TitleContext = createContext()

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState(titleMap)

    /** @type {import('./types.js').UpdateTitleProps} */
    const update = useCallback(({ header, toast }) => {
        setTitle(prevTitle => ({
            ...prevTitle,
            header: header || `Welcome. Let's produce`,
            toast
        }))
    }, [])

    const value = useMemo(() => ({ title, update }), [title, update])

    //console.log('TitleProvider - title:', title)

    return (
        <TitleContext.Provider value={value}>
            {children}
        </TitleContext.Provider>
    )
}

export const useTitle = () => useContext(TitleContext)