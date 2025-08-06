import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../provider/ManageModelProvider.jsx'

import { useSwitchLayout } from '../../../hook/useSwitchLayout.js'

import ModalForm from './ModalForm.jsx'
import ModalDetails from './ModalDetails.jsx'
import ModalConfig from './ModalConfig.jsx'
import ModalTag from './ModalTag.jsx'

import '../../styles/panels/Tag.scss'
import '../../styles/panels/Notification.scss'
import '../../styles/panels/ModalDetails.scss'
import '../../styles/panels/Panel.scss'

const renderLayoutContentPanel = (panelPosition, renderConfig) => {
    switch (panelPosition) {
        case 'center':
            return (
                <>
                    <ModalForm {...renderConfig} />
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
    const { model } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()

    const panelType = ['panel-left', 'panel-center', 'panel-right']
    const formartType = model.typeModel && model.typeModel !== '' ? model.typeModel : visibleElements[1]
    const renderConfig = {
        type: formartType,
        modelID: model.mainModelID
    }

    //console.log('manage model from PANEL - ', model)

    return (
        <div className={`content-${layoutComponent.panel.layout} ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${renderConfig.type}`}>
            {renderLayoutContentPanel(layoutComponent.panel.layout, renderConfig)}
        </div>
    )
}

export default Panel