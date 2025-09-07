import { useContext } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction.jsx'
import ModalConfigSection from '../../items/modals/modal_config/ModalConfigSection.jsx'

import '../ModalConfig/ModalConfig.scss'

const Config = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const typeSection = visibleElements[2] ?? ''
    return (
        <div className="container-config center-content">
            <div className='head'>
                <h2>{iconMap['config']}Configurations</h2>
                <ButtonAction target={targetMap(null)} classBtn='button-action-p close-modal' icon='close'/>
            </div>
            <div className='body'>
                <div className='aside-config'>
                    <div className='nav-itens'>
                        <div className='head'>
                            <label className='button-filter-m search'>
                                {iconMap['search']}<input type='text' placeholder='search' id='search-content-m' className='search-content'/>
                            </label>
                        </div>
                        <div className='body'>
                            {/* <ButtonAction target={targetMap('config-notification', { add: true })} classBtn=' button-action-config config-notification sq' title='Notifications' iconFa='fa-solid fa-bell'/> */}
                            <ButtonAction target={targetMap('config-theme', { add: true })} classBtn=' button-action-config config-theme sq' title='Themes' icon='themes'/>
                            <ButtonAction target={targetMap('config-search', { add: true })} classBtn=' button-action-config config-search sq' title='Searched items' icon='searchalt'/>
                            <ButtonAction target={targetMap('config-layout', { add: true })} classBtn=' button-action-config config-layout sq' title='Layout' icon='layoutgrid'/>
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

export default Config