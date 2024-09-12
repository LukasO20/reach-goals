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
                    {/* <span className="theme button-header"><i className="icon-st fa fa-solid fa-pallete"></i></span> */}
                </Link>
            </div>
            <div className="item-nav">
                <Link to="/calendar">
                    {/* <span className="tags button-header"><i className="icon-st fa fa-regular fa-calendar"></i></span> */}
                </Link>
            </div>
            <div className="item-nav">
                <Link to="/objectives">
                    {/* <span className="notification button-header"><i className='icon-st fa fa-regular fa-pen-to-square'></i></span> */}
                </Link>
            </div>
            <div className="item-nav">
                <Link to="/config">
                    {/* <span className="profile button-header"><i className="icon-st fa fa-solid fa-sliders"></i></span> */}
                </Link>
            </div>
        </div>
    </div>