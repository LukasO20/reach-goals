import React, { useContext } from 'react'
import Button from '../items/elements/Button'
import ModalConfigSection from '../items/config_components/ModalConfigSection'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'

import '../../styles/panels/Config.scss'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const Config = () => {
    const { visibleElements } = useContext(VisibilityContext)

    const btnCurrent = visibleElements[1] ?? ''
    const typeSection = btnCurrent.split(' ')[0]

    return (
        <div className="container-config center-content">
            <div className='head'>
                <h2><i className='icon-st fa-solid fa-sliders'></i>Configurations</h2>
                <Button target={targetMap(null)} classBtn='button-action-p close-modal button-st' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                <div className='aside-config'>
                    <div className='nav-itens'>
                        <div className='head'>
                            <label className='button-filter-m search'>
                                <i className='icon-st fa-solid fa-magnifying-glass'></i><input type='text' placeholder='search' id='search-content-m' className='search-content'/>
                            </label>
                        </div>
                        <div className='body'>
                            <Button classBtn='button-st button-action-m config-not' title='Notifications' iconFa='fa-solid fa-bell'/>
                            <Button classBtn='button-st button-action-m config-theme' title='Themes' iconFa='fa-solid fa-palette'/>
                            <Button classBtn='button-st button-action-m config-search' title='Searched items' iconFa='fa-solid fa-list'/>
                            <Button classBtn='button-st button-action-m config-layout' title='Layout' iconFa='fa-solid fa-layer-group'/>
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