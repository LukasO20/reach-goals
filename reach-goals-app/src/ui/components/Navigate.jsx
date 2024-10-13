import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { VisibilityContext } from '../../provider/components/VisibilityProvider'

import '../styles/Navigate.scss'
import Button from './items/elements/Button'

const Navigate = () => {
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-navigate aside-content" onClick={(e) => toggleVisibility(null, null, e)}>
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
                    <Button id={'panel-center'} target="btn-action-config" classBtn='btn-action-config button-nav' iconFa='fa-solid fa-sliders'/>
                </div>
            </div>
        </div>
    )
}

export default Navigate