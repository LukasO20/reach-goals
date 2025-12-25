import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { targetMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonLink from '../items/elements/ButtonLink/ButtonLink.jsx'

import '../navigate/Navigate.scss'

const Navigate = () => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const isCalendarPage = layoutComponent.page === 'calendar'
    const isObjectivesPage = layoutComponent.page === 'objectives'

    const handleClickNavigate = (e) => {
        if (!e) return
        
        toggleVisibility(targetMap(), e)
        navigate(`/${layoutComponent.page}`) // return standard route during handle
    }

    return (
        <div className="container-navigate aside-content" onClick={(e) => handleClickNavigate(e)}>
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
                    <ButtonAction target={targetMap(['modal-center', 'config'])} classBtn={`button-action circle config ${visibleElements.includes('config') ? 'active' : ''}`} icon='config'
                        switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'config' })} />
                </div>
            </div>
        </div>
    )
}

export default Navigate