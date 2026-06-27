import { useNavigate, useLocation } from 'react-router-dom'

import { useCheckbox } from '../../provider/ui/checkbox-provider'
import { useSwitchLayout } from '../../provider/ui/switch-layout-provider'
import { useTheme } from '../../provider/ui/theme-provider'

import { switchLayoutMap } from '../../utils/mapping/mappingUtils.js'

import { cx } from '../../utils/utils.js'

import ButtonLink from '../items/elements/button-link'
import ButtonAction from '../items/elements/button-action'
import Tooltip from '../items/elements/tooltip'

import LogoLight from '../../assets/logo-light.svg'
import LogoDark from '../../assets/logo-dark.svg'

import './style.scss'

const Navigate = () => {
    const { data: { layout, visibility }, setUserConfigLayout } = useSwitchLayout()
    const { resetCheckbox } = useCheckbox()
    const { theme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const isHomePage = layout.page.pageName === 'home' || location.pathname.slice(1) === 'home'
    const isCalendarPage = layout.page.pageName === 'calendar' || location.pathname.slice(1) === 'calendar'
    const isObjectivesPage = layout.page.pageName === 'objectives' || location.pathname.slice(1) === 'objectives'
    const isNavigateBarExpand = visibility.navigateBar === 'expand'

    const navigateBarData = {
        titleBtn: {
            logo: isNavigateBarExpand ? 'Reach Goals' : undefined,
            home: isNavigateBarExpand ? 'Home' : undefined,
            calendar: isNavigateBarExpand ? 'Calendar' : undefined,
            objectives: isNavigateBarExpand ? 'Objectives' : undefined,
        },
        titleTooltip: {
            home: isNavigateBarExpand ? undefined : 'Home',
            calendar: isNavigateBarExpand ? undefined : 'Calendar',
            objectives: isNavigateBarExpand ? undefined : 'Objectives',
        }
    }

    const handleClickNavigate = (e) => {
        if (e) navigate(`/${layout.page.pageName}`)
    }

    const handleButtonLinkClick = (page = '') => {
        const layoutPage = layout.page.pageName
        if (layoutPage === page) return null
        resetCheckbox({ keys: ['page'] })
    }

    const handleClickNavigateExpand = () => {
        const navigateBarValue = isNavigateBarExpand ? 'compact' : 'expand'
        setUserConfigLayout({ type: 'visibility', data: { navigateBar: navigateBarValue } })
    }

    const buttonLinkLogoClass = cx(
        `circle
        logo
        `
    )

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

    const buttonLinkClass = cx(
        `${isNavigateBarExpand && 'plan-round'}`
    )

    const navClass = cx(
        `
        nav
        ${isNavigateBarExpand && 'expanded'}
        `
    )

    const tooltipPositions = { left: '100%', bottom: '0', transform: 'translateX(8.5%)' }

    const logoImgTheme = theme === 'light' ? LogoLight : LogoDark

    return (
        <div className='container-navigate aside-content' onClick={(e) => handleClickNavigate(e)}>
            <div className={navClass}>
                <div className='item-nav'>
                    <ButtonLink
                        link={'/home'}
                        classBtn={`${buttonLinkLogoClass} ${buttonLinkClass}`}
                        img={logoImgTheme}
                        title={navigateBarData.titleBtn.logo}
                        switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'home', layoutName: 'column' } })}
                        onClick={() => handleButtonLinkClick('home')}
                    />
                </div>
                <div className='item-nav'>
                    <Tooltip title={navigateBarData.titleTooltip.home} positions={tooltipPositions}>
                        <ButtonLink
                            link={'/home'}
                            classBtn={`${buttonLinkHomeClass} ${buttonLinkClass}`}
                            icon='icon-home'
                            title={navigateBarData.titleBtn.home}
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'home', layoutName: 'column' } })}
                            onClick={() => handleButtonLinkClick('home')}
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <Tooltip title={navigateBarData.titleTooltip.calendar} positions={tooltipPositions}>
                        <ButtonLink
                            link='/calendar'
                            classBtn={`${buttonLinkCalendarClass} ${buttonLinkClass}`}
                            icon='icon-calendar'
                            title={navigateBarData.titleBtn.calendar}
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'calendar', layoutName: 'all' } })}
                            onClick={() => handleButtonLinkClick('calendar')}
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <Tooltip title={navigateBarData.titleTooltip.objectives} positions={tooltipPositions}>
                        <ButtonLink
                            link='/objectives'
                            classBtn={`${buttonLinkObjectivesClass} ${buttonLinkClass}`}
                            icon='icon-activity'
                            title={navigateBarData.titleBtn.objectives}
                            switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: 'objectives', layoutName: 'all' } })}
                            onClick={() => handleButtonLinkClick('objectives')}
                        />
                    </Tooltip>
                </div>
                <ButtonAction
                    icon='icon-arrow-right'
                    classBtn='circle small button-navigate-bar'
                    onClick={handleClickNavigateExpand}
                />
            </div>
        </div>
    )
}

export default Navigate