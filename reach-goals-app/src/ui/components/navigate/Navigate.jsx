import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { targetMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonLink from '../items/elements/ButtonLink/ButtonLink.jsx'

import '../navigate/Navigate.scss'

const Navigate = () => {
    const { toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    const isCalendarPage = layoutComponent.page === 'calendar'
    const isObjectivesPage = layoutComponent.page === 'objectives'

    return (
        <div className="container-navigate aside-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink link={'/home'} classBtn={`button-action circle home`} img="/logo.png" alt="Home button" />                
                </div>
                <div className="item-nav">
                    <ButtonLink link={'/calendar'} classBtn={`button-action circle calendar ${isCalendarPage && 'active'}`} icon="calendar" />                
                </div>
                <div className="item-nav">
                    <ButtonLink link={'/objectives'} classBtn={`button-action circle objectives ${isObjectivesPage && 'active'}`} icon="objectives" />                
                </div>
                <div className="item-nav">
                    <ButtonAction target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'center' })} classBtn='button-action circle config' icon='config' />
                </div>
            </div>
        </div>
    )
}

export default Navigate