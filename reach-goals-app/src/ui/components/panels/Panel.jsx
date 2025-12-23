import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ModalForm from './ModalForm/ModalForm.jsx'
import ModalConfig from './ModalConfig/ModalConfig.jsx'

import '../panels/Panel.scss'

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
                    {/* <ModalTag /> */}
                    {/* <ModalDetails {...renderConfig} /> */}
                </>
            )
        default:
            return null
    }
}

const Panel = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()
    const panelType = ['panel-left', 'panel-center', 'panel-right']

    return (
        <div className={`content-${layoutComponent.panel.layout} ${panelType.some(panel => visibleElements.includes(panel)) ? 'show' : ''} ${visibleElements[1]}`}>
            {renderLayoutContentPanel(layoutComponent.panel.layout, { type: visibleElements[1] })}
        </div>
    )
}

export default Panel