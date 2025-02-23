import React, { useContext } from 'react'
import { VisibilityContext } from '../../../hooks/VisibilityProvider'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/PanelLeft.scss'

const PanelLeft = (props) => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className={`content-aside-r ${visibleElements.includes(props.id) ? 'show' : ''}`}></div>
    )
}

export default PanelLeft