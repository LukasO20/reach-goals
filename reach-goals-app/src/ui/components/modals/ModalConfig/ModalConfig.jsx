import { useContext } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ModalConfigSection from '../../items/modals/ModalConfigSection/ModalConfigSection.jsx'
import SearchBar from '../../items/elements/SearchBar/SearchBar.jsx'

import './ModalConfig.scss'

const ModalConfig = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const typeSection = visibleElements[2] ?? ''

    return (
        <div className="container-config center-content">
            <div className='head'>
                <h2>{iconMap['config']}Configurations</h2>
                <ButtonAction target={targetMap(null)} classBtn='button-action circle close' icon='close'/>
            </div>
            <div className='body'>
                <div className='aside-config'>
                    <div className='nav-itens'>
                        <div className='head'>
                            <SearchBar />
                        </div>
                        <div className='body'>
                            <ButtonAction target={targetMap('config-theme', { add: true })} 
                                classBtn={`button-action ${typeSection === 'config-theme' ? 'active' : ''} plan config-theme`} title='themes' icon='themes'/>
                            <ButtonAction target={targetMap('config-search', { add: true })} 
                                classBtn={`button-action ${typeSection === 'config-search' ? 'active' : ''} plan config-search`} title='searched items' icon='searchalt'/>
                            <ButtonAction target={targetMap('config-layout', { add: true })} 
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