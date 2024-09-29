import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { TitleContext } from '../../provider/components/TitleProvider'
import { VisibilityContext } from '../../provider/components/VisibilityProvider'

import ButtonLink from './items/elements/ButtonLink'

//Main function
const ContainerH = () => {
    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    
    const { title } = useContext(TitleContext)
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-header main-content" onClick={(e) => toggleVisibility(null, e)}>
            <div className="titles-header">
                <h1>{ title }</h1>
            </div>
            <div className="nav">
                <div className='item-nav'>
                    <ButtonLink id="btn-theme" classBtn="button-h theme" iconFa="fa-solid fa-palette"/>
                </div>
                <div className="item-nav">
                    <ButtonLink link={`${currentLocation}/tag`} id="btn-tag" classBtn="button-h tag" iconFa="fa-solid fa-tag"/>
                </div>
                <div className="item-nav">
                    <ButtonLink link={`${currentLocation}/notification`} id="btn-notification" classBtn="button-h notification" iconFa="fa-solid fa-bell"/>
                </div>
                <div className="item-nav">
                    <ButtonLink id="btn-profile" classBtn="button-h profile" iconFa="fa-solid fa-user"/>
                </div>
            </div>
        </div>
    )
}

export default ContainerH
