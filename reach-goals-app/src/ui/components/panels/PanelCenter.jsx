import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import ModalForm from './ModalForm'
import Config from './Config'

const PanelCenter = (props) => {
    const { visibleElements = [] } = useContext(VisibilityContext)
    const btnCurrent = visibleElements[1] ?? ''
    const btnClass = btnCurrent.split(' ')[0]

    return (
        <div className={`content-center ${visibleElements.includes(props.id) ? 'show' :  ''} ${btnClass}`}>
            <Config />
            <ModalForm fromBtnClass={btnClass} />
        </div>
    )
}

export default PanelCenter