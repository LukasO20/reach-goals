import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { VisibilityContext } from '../../provider/components/VisibilityProvider'

import '../styles/Navigate.scss'
import Button from './items/elements/Button'

const Navigate = () => {
    const location = useLocation()
    const currentLocation = location.pathname

    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-navigate aside-content" onClick={(e) => toggleVisibility(null, e)}>
            <div className="nav">
                <div className='item-nav'>
                    <Link to="/home">
                        <div className='home button-nav'><img src="/logo.png" alt="" /></div>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to="/calendar">
                        <span className="calendar button-nav"><i className="icon-st fa-regular fa-calendar"></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to="/objectives">
                        <span className="objectives button-nav"><i className='icon-st fa-regular fa-pen-to-square'></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    {/* <Link to={currentLocation.includes('/config') ? currentLocation : `${currentLocation}/config` }>
                        <span className="config button-nav"><i className="icon-st fa-solid fa-sliders"></i></span>
                    </Link> */}
                    <Button id={['btn-config', 'panel-center']} classBtn='btn-action-config button-nav' iconFa='fa-solid fa-sliders' /*onClick={(e) => toggleVisibility('panel-center', e)}*//>
                </div>
            </div>
        </div>
    )
}

export default Navigate