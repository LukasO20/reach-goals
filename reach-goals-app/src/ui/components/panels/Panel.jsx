import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../hook/useSwitchLayout'

import ModalForm from './ModalForm'
import ModalDetails from './ModalDetails'
import ModalConfig from './ModalConfig'
import ModalTag from './ModalTag'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/Panel.scss'

const renderLayoutContentPanel = (panelPosition, type) => {
    switch (panelPosition) {
        case 'center':
            return (
                <>
                    <ModalForm type={type}/>
                    <ModalConfig />
                </>
            ) 
        case 'right':
            return (
                <>
                    <ModalTag />
                    <ModalDetails type={type} />
                </>
            )
        default:
            return null
    }
}

const Panel = (props) => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()
    
    const panelType = ['panel-left', 'panel-center', 'panel-right']
    const btnCurrent = visibleElements[1] ?? ''
    const type = btnCurrent.split(' ')[0]

    return (
        <div className={`content-${layoutComponent.panel.layout} ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${type}`}>  
            {renderLayoutContentPanel(layoutComponent.panel.layout, type)}
        </div>
    )
} 

export default Panel