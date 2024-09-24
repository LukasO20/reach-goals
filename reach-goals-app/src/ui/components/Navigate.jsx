import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TitleContext } from '../../provider/components/TitleProvider'

import '../styles/Navigate.scss'

const Navigate = () => {
    const location = useLocation()
    const currentLocation = location.pathname

    return (
        <div className="container-navigate aside-content">
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
                    <Link to={ currentLocation.includes('/config') ? currentLocation : `${currentLocation}/config` }>
                        <span className="config button-nav"><i className="icon-st fa-solid fa-sliders"></i></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigate