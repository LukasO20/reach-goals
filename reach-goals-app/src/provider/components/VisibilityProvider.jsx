import React, { useState } from 'react'

const VisibilityContext = React.createContext()

//NOTA
//QUANDO POSSUIR UM HELPER ELE SERÁ RESPONSÁVEL POR APLICAR AÇÕES NELE MESMO, ASSIM SERÁ USADO O ...(spread)
//QUANDO NÃO POSSUIR O HELPER É UMA OPÇÃO SEM ...(spread)

const VisibilityProvider = ({children}) => {
    const [visibleElements, setVisibleElement] = useState([])

    const addVisibility = (target) => {
        if (target.itself === true) {
            setVisibleElement((prev) => [...prev, target.idTarget, target.typeTarget])
        } else {
            setVisibleElement([target.idTarget, target.typeTarget])
        }
    }

    const removeVisibility = (target) => {
        if (target.itself === true) {
            setVisibleElement((prev) => prev.filter(id => id !== target.idTarget))
        } else {
            setVisibleElement([])
        }
    }

    const toggleVisibility = (target, event) => {
        event.stopPropagation()
        const parameterTarget = target ?? {idTarget: null, typeTarget: null, itself: false}
        const isVisible = visibleElements.includes(parameterTarget.idTarget);

        if (isVisible) {
            removeVisibility(parameterTarget.idTarget)
        } else {
            addVisibility(parameterTarget)
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