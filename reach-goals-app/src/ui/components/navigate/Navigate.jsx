import { useNavigate, useLocation } from 'react-router-dom'

import { useCheckbox } from '../../../provider/ui/CheckboxProvider'
import { useVisibility } from '../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider.jsx'

import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../utils/utils.js'

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

    const buttonLinkHomeClass = cx(
        `circle
        home
        ${isHomePage && 'active'}
        `
    )

    const buttonLinkCalendarClass = cx(
        `circle
        calendar
        ${isCalendarPage && 'active'}
        `
    )

    const buttonLinkObjectivesClass = cx(
        `circle
        objectives
        ${isObjectivesPage && 'active'}
        `
    )

    const buttonLinkConfigClass = cx(
        `circle
        config
        ${visibleElements.includes('config') && 'active'}
        `
    )

    return (
        <div className='container-navigate aside-content' onClick={(e) => handleClickNavigate(e)}>
            <div className='nav'>
                <div className='item-nav'>
                    <ButtonLink link={'/home'} classBtn={buttonLinkHomeClass} img='/logo.png' alt='Home button'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'home', layoutName: 'goal' } })}
                        onClick={() => handleButtonLinkClick('home')}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link='/calendar' classBtn={buttonLinkCalendarClass} icon='calendar'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'calendar', layoutName: 'all' } })}
                        onClick={() => handleButtonLinkClick('calendar')}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink link='/objectives' classBtn={buttonLinkObjectivesClass} icon='objectives'
                        switchLayout={switchLayoutMap({ area: 'page', state: { pageName: 'objectives', layoutName: 'all' } })}
                        onClick={() => handleButtonLinkClick('objectives')}
                    />
                </div>
                <div className='item-nav'>
                    <ButtonAction visibility={visibilityMap(['modal-center', 'config'])} classBtn={buttonLinkConfigClass} icon='config'
                        switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-center', layoutName: 'config' } })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navigate