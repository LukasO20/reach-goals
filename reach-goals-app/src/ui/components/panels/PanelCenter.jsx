import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import ModalForm from './ModalForm'
import Config from './Config'

const PanelCenter = (props) => {
    const { visibleElements = [] } = useContext(VisibilityContext)
    const btnCurrent = visibleElements[1] ?? ''
    const typeForm = btnCurrent.split(' ')[0]

    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''} ${typeForm}`}>
            <Config />
            <ModalForm type={typeForm} />
        </div>
    )
}

export default PanelCenter