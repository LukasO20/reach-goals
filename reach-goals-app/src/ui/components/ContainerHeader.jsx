import React from "react"
import { Link } from 'react-router-dom'

export default props => 
    <div className="container-header main-content">
        <div className="titles-header">
            <h1>Welcome. Let's produce?</h1>
        </div>
        <div className="nav">
            <div className='item-nav'>
                <Link to="/">
                    <span className="theme button-header"><i className="icon-st fa-solid fa-palette"></i></span>
                </Link>
            </div>
            <div className="item-nav">
                <Link to="/">
                    <span className="tags button-header"><i className="icon-st fa-solid fa-tag"></i></span>
                </Link>
            </div>
            <div className="item-nav">
                <Link to="/">
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