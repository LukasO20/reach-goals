import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../hook/useSwitchLayout'

import ModalForm from './ModalForm'
import ModalDetails from './ModalDetails'
import Config from './Config'
import Tag from './Tag'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/Panel.scss'

const renderLayoutContentPanel = (panelPosition, typeForm) => {
    switch (panelPosition) {
        case 'center':
            return (
                <>
                    <ModalForm type={typeForm}/>
                    <Config />
                </>
            ) 
        case 'right':
            return (
                <>
                    <Tag />
                    <ModalDetails />
                </>
            )
        case 'near':
            return (
                <>
                    <ModalForm type={typeForm}/>
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
    const typeForm = btnCurrent.split(' ')[0]

    return (
        <div className={`content-${layoutComponent.panel.layout} ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${typeForm}`}>  
            {renderLayoutContentPanel(layoutComponent.panel.layout, typeForm)}
        </div>
    )
} 

export default Panel