import { useContext } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { visibilityMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ModalConfigSection from '../../items/modals/ModalConfigSection/ModalConfigSection.jsx'

import './ModalConfig.scss'

const ModalConfig = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const typeSection = visibleElements[2] ?? ''

    return (
        <div className="container-config center-content">
            <div className='head'>
                <h2>{iconMap['config']}Configurations</h2>
                <ButtonAction visibility={visibilityMap(null)} classBtn='button-action circle close' icon='close'/>
            </div>
            <div className='body'>
                <div className='aside-config'>
                    <div className='nav-itens'>
                        <div className='body'>
                            <ButtonAction visibility={visibilityMap('config-theme', { add: true })} 
                                classBtn={`button-action ${typeSection === 'config-theme' ? 'active' : ''} plan config-theme`} title='themes' icon='themes'/>
                            <ButtonAction visibility={visibilityMap('config-search', { add: true })} 
                                classBtn={`button-action ${typeSection === 'config-search' ? 'active' : ''} plan config-search`} title='searched items' icon='searchalt'/>
                            <ButtonAction visibility={visibilityMap('config-layout', { add: true })} 
                                classBtn={`button-action ${typeSection === 'config-layout' ? 'active' : ''} plan config-layout`} title='layout' icon='layoutgrid'/>
                        </div>
                    </div>
                </div>
                <div className='section-options-config'>
                    <ModalConfigSection type={typeSection} />
                </div>
            </div>
        </div>
    )
}

export default ModalConfig