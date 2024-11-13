import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import ModalForm from './ModalForm'
import Config from './Config'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data
    }
    return attributes
}

const PanelCenter = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)

    const btnCurrent = visibleElements[1] ?? ''
    const typeForm = btnCurrent.split(' ')[0]
    
    // Used to remove target childrens
    //const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''} ${typeForm}`}>
            <Config />
            <ModalForm type={typeForm} />
        </div>
    )
}

export default PanelCenter