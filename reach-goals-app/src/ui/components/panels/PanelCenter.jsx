import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'

const PanelCenter = (props) => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''}`}></div>
    )
}

export default PanelCenter