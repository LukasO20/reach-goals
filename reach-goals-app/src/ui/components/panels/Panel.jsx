import { useContext } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { ManageModelContext } from '../../../provider/ManageModelProvider'
import { useSwitchLayout } from '../../../hook/useSwitchLayout'

import ModalForm from './ModalForm'
import ModalDetails from './ModalDetails'
import ModalConfig from './ModalConfig'
import ModalTag from './ModalTag'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/Panel.scss'

const renderLayoutContentPanel = (panelPosition, renderConfig) => {

    switch (panelPosition) {
        case 'center':
            return (
                <>
                    <ModalForm {...renderConfig}/>
                    <ModalConfig />
                </>
            ) 
        case 'right':
            return (
                <>
                    <ModalTag />
                    <ModalDetails {...renderConfig} />
                </>
            )
        default:
            return null
    }
}

const Panel = (props) => {
    const { visibleElements } = useContext(VisibilityContext)
    const { manageModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()
    
    const panelType = ['panel-left', 'panel-center', 'panel-right']
    const btnCurrent = visibleElements[1] ?? ''
    const renderConfig = {
        type: btnCurrent.split(' ')[0],
        modelID: manageModel.mainModelID
    }

    return (
        <div className={`content-${layoutComponent.panel.layout} ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${renderConfig.type}`}>  
            {renderLayoutContentPanel(layoutComponent.panel.layout, renderConfig)}
        </div>
    )
} 

export default Panel