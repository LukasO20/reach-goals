import React, { useState } from 'react'

const VisibilityContext = React.createContext()

//NOTA
//QUANDO POSSUIR UM HELPER ELE SERÁ RESPONSÁVEL POR APLICAR AÇÕES NELE MESMO, ASSIM SERÁ USADO O ...(spread)
//QUANDO NÃO POSSUIR O HELPER É UMA OPÇÃO SEM ...(spread)

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const addVisibility = (target, helper) => {
        setVisibleElement((prev) => [...prev, target.idTarget, target.typeTarget])
    }

    const removeVisibility = (id) => {
        setVisibleElement((prev) => prev.filter(idActually => idActually !== id))
    }

    const toggleVisibility = (target, helper, event) => {
        event.stopPropagation()
        const parameterHelper = helper ?? {id: null, itself: null}
        const parameterTarget = target ?? {idTarget: null, typeTarget: null}
        const isVisible = visibleElements.includes(parameterTarget.idTarget);

        if (isVisible) {
            removeVisibility(parameterTarget.idTarget)
        } else {
            addVisibility(parameterTarget, parameterHelper)
        }
    }

    console.log('VISIBLES - ', visibleElements)

    return (
        <VisibilityContext.Provider value={{ visibleElements, toggleVisibility }}>
            {children} 
        </VisibilityContext.Provider>
    )
}

export { VisibilityContext, VisibilityProvider }