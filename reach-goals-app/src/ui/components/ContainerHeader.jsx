import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { TitleContext } from '../../provider/TitleProvider.jsx'
import { VisibilityContext } from '../../provider/VisibilityProvider.jsx'

import { targetMap, switchLayoutMap } from '../../utils/mappingUtils.js'

import ButtonLink from './items/elements/ButtonLink.jsx'

const ContainerH = () => {
    const { title } = useContext(TitleContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    
    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'

    return (
        <div className="container-header main-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="titles-header">
                <h1>{ title }</h1>
            </div>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink id="btn-theme" classBtn="button-h theme" iconFa="fa-solid fa-palette"/>
                </div>
                <div className="item-nav" onClick={(e) => toggleVisibility(targetMap(['panel-right', 'tag']), e)}>
                    <ButtonLink id="btn-tag"  switchLayout={switchLayoutMap('panel', 'layout', 'right')} link={`${currentLocation}/tag`} classBtn="button-h tag" iconFa="fa-solid fa-tag"/>
                </div>
                {/* <div className="item-nav" onClick={(e) => toggleVisibility(target, e)}>
                    <ButtonLink id="btn-notification" link={`${currentLocation}/notification`} classBtn="button-h notification" iconFa="fa-solid fa-bell"/>
                </div> */}
                <div className="item-nav">
                    <ButtonLink id="btn-profile" classBtn="button-h profile" iconFa="fa-solid fa-user"/>
                </div>
            </div>
        </div>
    )
}

export default ContainerH
