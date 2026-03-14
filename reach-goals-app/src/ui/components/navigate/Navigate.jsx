import { useNavigate, useLocation } from 'react-router-dom'

import { useCheckbox } from '../../../provider/CheckboxProvider'

import { useVisibility } from '../../../provider/VisibilityProvider.jsx'
import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonLink from '../items/elements/ButtonLink/ButtonLink.jsx'

import './Navigate.scss'

const Navigate = () => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { layout } = useSwitchLayout()
    const { resetCheckbox } = useCheckbox()
    const navigate = useNavigate()
    const location = useLocation()

    const isHomePage = layout.page.pageName === 'home' || location.pathname.slice(1) === 'home'
    const isCalendarPage = layout.page.pageName === 'calendar' || location.pathname.slice(1) === 'calendar'
    const isObjectivesPage = layout.page.pageName === 'objectives' || location.pathname.slice(1) === 'objectives'

    const handleClickNavigate = (e) => {
        if (!e) return

        toggleVisibility(visibilityMap(), e)
        navigate(`/${layout.page.pageName}`) // return standard route during handle
    }

    const handleButtonLinkClick = (page = '') => {
        const layoutPage = layout.page.pageName
        if (layoutPage === page) return null
        resetCheckbox({ keys: ['page'] })
    }

    return (
        <div className='container-navigate aside-content' onClick={(e) => handleClickNavigate(e)}>
            <div className='nav'>
                <div className='item-nav'>
                    <ButtonLink link={'/home'} classBtn={`circle home ${isHomePage ? 'active' : ''}`} img='/logo.png' alt='Home button'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'home', layoutName: 'goal' } })}
                        onClick={() => handleButtonLinkClick('home')}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link='/calendar' classBtn={`circle calendar ${isCalendarPage ? 'active' : ''}`} icon='calendar'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'calendar', layoutName: 'all' } })}
                        onClick={() => handleButtonLinkClick('calendar')}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link='/objectives' classBtn={`circle objectives ${isObjectivesPage ? 'active' : ''}`} icon='objectives'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'objectives', layoutName: 'all' } })}
                        onClick={() => handleButtonLinkClick('objectives')}
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