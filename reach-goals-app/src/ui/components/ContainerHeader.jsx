import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { TitleContext } from '../../hooks/TitleProvider'
import { VisibilityContext } from '../../hooks/VisibilityProvider'

import ButtonLink from './items/elements/ButtonLink'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
    }
    return attributes
}

const ContainerH = () => {
    const { title } = useContext(TitleContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    
    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    const target = targetMap('panel-left')

    return (
        <div className="container-header main-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="titles-header">
                <h1>{ title }</h1>
            </div>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink id="btn-theme" classBtn="button-h theme" iconFa="fa-solid fa-palette"/>
                </div>
                <div className="item-nav" onClick={(e) => toggleVisibility(target, e)}>
                    <ButtonLink id="btn-tag" link={`${currentLocation}/tag`} classBtn="button-h tag" iconFa="fa-solid fa-tag"/>
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
