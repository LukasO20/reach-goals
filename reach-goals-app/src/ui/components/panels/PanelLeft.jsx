import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'

const PanelLeft = (props) => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className={`content-aside-r ${visibleElements.includes(props.id) ? 'show' : ''}`}></div>
    )
}

export default PanelLeft