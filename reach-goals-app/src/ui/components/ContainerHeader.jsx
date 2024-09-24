import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TitleContext } from '../../provider/components/TitleProvider'

//Main function
const ContainerH = () => {
    const location = useLocation()
    const currentLocation = location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
    const { title } = useContext(TitleContext)

    return (
        <div className="container-header main-content">
            <div className="titles-header">
                <h1>{ title }</h1>
            </div>
            <div className="nav">
                <div className='item-nav'>
                    <Link to="/">
                        <span className="theme button-header"><i className="icon-st fa-solid fa-palette"></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to={`${currentLocation}/tag`}>
                        <span className="tags button-header"><i className="icon-st fa-solid fa-tag"></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to={`${currentLocation}/notification`}>
                        <span className="notification button-header"><i className='icon-st fa-solid fa-bell'></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to="/">
                        <span className="profile button-header"><i className="icon-st fa-solid fa-user"></i></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContainerH
