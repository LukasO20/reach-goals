import React, { useContext } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../hook/useSwitchLayout'

import ModalForm from './ModalForm'
import Config from './Config'
import Tag from './Tag'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/PanelLeft.scss'

const renderLayoutPanel = (panelPosition, typeForm) => {
    switch (panelPosition) {
        case 'center':
            return (
                <>
                    <ModalForm type={typeForm}/>
                    <Config />
                </>
            ) 
        case 'left':
            return (
                <>
                    <Tag />
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
    
    const panelPosition = props?.panelPosition ?? ''
    const panelType = ['panel-left', 'panel-center']
    const btnCurrent = visibleElements[1] ?? ''
    const typeForm = btnCurrent.split(' ')[0]

    //TRY TO USE SWITCHLAYOUTPROVIDER values here
    return (
        <div className={`content-center ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${typeForm}`}>  
            {renderLayoutPanel(panelPosition, typeForm)}
        </div>
    )
} 

export default Panel