import React, { useState } from 'react'

const PageTypeContext = React.createContext()

const PageTypeProvider = ({ children }) => {
  const [pageType, setPageType] = useState('home')

  return (
    <PageTypeContext.Provider value={{ pageType, setPageType }}>
      {children}
    </PageTypeContext.Provider>
  )
}

export { PageTypeContext, PageTypeProvider }