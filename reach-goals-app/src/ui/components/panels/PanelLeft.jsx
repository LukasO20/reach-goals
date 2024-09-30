import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'

const PanelLeft = (props) => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className={`content-aside-r ${visibleElements.includes(props.id) ? 'show' : ''}`}></div>
    )
}

export default PanelLeft