import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonLink from '../items/elements/ButtonLink/ButtonLink.jsx'

import '../navigate/Navigate.scss'

const Navigate = () => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { layout } = useSwitchLayout()
    const navigate = useNavigate()
    const location = useLocation()

    const isCalendarPage = layout.page.pageName === 'calendar' || location.pathname.slice(1) === 'calendar'
    const isObjectivesPage = layout.page.pageName === 'objectives' || location.pathname.slice(1) === 'objectives'

    const handleClickNavigate = (e) => {
        if (!e) return

        toggleVisibility(visibilityMap(), e)
        navigate(`/${layout.page.pageName}`) // return standard route during handle
    }

    return (
        <div className='container-navigate aside-content' onClick={(e) => handleClickNavigate(e)}>
            <div className='nav'>
                <div className='item-nav'>
                    <ButtonLink link={'/home'} classBtn={`button-action circle home`} img='/logo.png' alt='Home button'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'home', layoutName: 'goal' } })}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link={'/calendar'} classBtn={`button-action circle calendar ${isCalendarPage && 'active'}`} icon='calendar'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'calendar', layoutName: 'all' } })}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link={'/objectives'} classBtn={`button-action circle objectives ${isObjectivesPage && 'active'}`} icon='objectives'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'objectives', layoutName: 'all' } })}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonAction visibility={visibilityMap(['modal-center', 'config'])} classBtn={`button-action circle config ${visibleElements.includes('config') ? 'active' : ''}`} icon='config'
                        switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-center', layoutName: 'config' } })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navigate