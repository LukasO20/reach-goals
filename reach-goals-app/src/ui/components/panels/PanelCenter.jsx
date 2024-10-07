import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import ModalForm from './ModalForm'
import Config from './Config'

const PanelCenter = (props) => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''}`}>
            <Config />
            <ModalForm />
        </div>
    )
}

export default PanelCenter