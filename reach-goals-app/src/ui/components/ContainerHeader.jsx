import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { ManageModelContext } from '../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../provider/VisibilityProvider.jsx'

import { useTitle } from '../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap } from '../../utils/mapping/mappingUtils.js'

import ButtonLink from './items/elements/ButtonLink.jsx'

const ContainerH = () => {
    const { title } = useTitle()
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setModel } = useContext(ManageModelContext)
    
    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'

    const linkTagClick = (event) => {
        if (event) setModel(prev => ({ ...prev, typeModel: 'tag' }))       
    }

    return (
        <div className="container-header main-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="titles-header">
                <h1>{ title }</h1>
            </div>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink id="btn-theme" classBtn="button-h theme" iconFa="fa-solid fa-palette"/>
                </div>
                <div className="item-nav" onClick={(e) => { toggleVisibility(targetMap(['panel-right', 'tag']), e); linkTagClick(e) }}>
                    <ButtonLink id="btn-tag" switchLayout={switchLayoutMap('panel', 'layout', 'right')} link={`${currentLocation}/tag`} classBtn="button-h tag" iconFa="fa-solid fa-tag"/>
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
