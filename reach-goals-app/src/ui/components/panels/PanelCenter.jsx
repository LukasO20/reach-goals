import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import ModalForm from './ModalForm'
import Config from './Config'

const PanelCenter = (props) => {
    const { visibleElements = [], toggleVisibility } = useContext(VisibilityContext)

    const btnCurrent = visibleElements[1] ?? ''
    const typeForm = btnCurrent.split(' ')[0]
    const otherTarget = visibleElements.slice(0, 2) // Used to remove other children without 
    const target = { idTarget: otherTarget, typeTarget: '' }

    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''} ${typeForm}`} onClick={(e) => toggleVisibility(target, e)}>
            <Config />
            <ModalForm type={typeForm} />
        </div>
    )
}

export default PanelCenter