import { useNavigate, useLocation } from 'react-router-dom'

import { useCheckbox } from '../../provider/ui/checkbox-provider'
import { useSwitchLayout } from '../../provider/ui/switch-layout-provider'

import { switchLayoutMap } from '../../utils/mapping/mappingUtils.js'

import { cx } from '../../utils/utils.js'

import ButtonLink from '../items/elements/button-link'
import Tooltip from '../items/elements/tooltip'

import './style.scss'

const Navigate = () => {
    const { data: { layout } } = useSwitchLayout()
    const { resetCheckbox } = useCheckbox()
    const navigate = useNavigate()
    const location = useLocation()

    const isHomePage = layout.page.pageName === 'home' || location.pathname.slice(1) === 'home'
    const isCalendarPage = layout.page.pageName === 'calendar' || location.pathname.slice(1) === 'calendar'
    const isObjectivesPage = layout.page.pageName === 'objectives' || location.pathname.slice(1) === 'objectives'

    const handleClickNavigate = (e) => {
        if (!e) return
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

    const tooltipPositions = { left: '100%', bottom: '0', transform: 'translateX(8.5%)' }

    return (
        <div className='container-navigate aside-content' onClick={(e) => handleClickNavigate(e)}>
            <div className='nav'>
                <div className='item-nav'>
                    <Tooltip title='Home' positions={tooltipPositions}>
                        <ButtonLink link={'/home'} classBtn={buttonLinkHomeClass} img='/logo.png' alt='Home button'
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'home', layoutName: 'column' } })}
                            onClick={() => handleButtonLinkClick('home')}
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <Tooltip title='Calendar' positions={tooltipPositions}>
                        <ButtonLink link='/calendar' classBtn={buttonLinkCalendarClass} icon='icon-calendar'
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'calendar', layoutName: 'all' } })}
                            onClick={() => handleButtonLinkClick('calendar')}
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <Tooltip title='Objectives' positions={tooltipPositions}>
                        <ButtonLink link='/objectives' classBtn={buttonLinkObjectivesClass} icon='icon-activity'
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'objectives', layoutName: 'all' } })}
                            onClick={() => handleButtonLinkClick('objectives')}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Navigate