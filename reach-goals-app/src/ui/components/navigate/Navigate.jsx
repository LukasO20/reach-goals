import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { targetMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../items/elements/ButtonAction.jsx'
import ButtonLink from '../items/elements/ButtonLink.jsx'

import '../navigate/Navigate.scss'

const Navigate = () => {
    const { toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    return (
        <div className="container-navigate aside-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink link={'/home'} classBtn="home button-nav" img="/logo.png" alt="Home button" />                
                </div>
                <div className="item-nav">
                    <ButtonLink link={'/calendar'} classBtn="calendar button-nav" icon="calendar" />                
                </div>
                <div className="item-nav">
                    <ButtonLink link={'/objectives'} classBtn="objectives button-nav" icon="objectives" />                
                </div>
                <div className="item-nav">
                    <ButtonAction target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'center' })} classBtn='btn-action-config button-nav' icon='config' />
                </div>
            </div>
        </div>
    )
}

export default Navigate