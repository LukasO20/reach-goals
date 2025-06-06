import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { VisibilityContext } from '../../provider/VisibilityProvider'
import { targetMap, switchLayoutMap } from '../../utils/mappingUtils'

import ButtonAction from './items/elements/ButtonAction'

import '../styles/Navigate.scss'

const Navigate = () => {
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-navigate aside-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="nav">
                <div className='item-nav'>
                    <Link to="/home">
                        <div className='home button-nav'><img src="/logo.png" alt="" /></div>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to="/calendar">
                        <span className="calendar button-nav button-st"><i className="icon-st fa-regular fa-calendar"></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <Link to="/objectives">
                        <span className="objectives button-nav button-st"><i className='icon-st fa-regular fa-pen-to-square'></i></span>
                    </Link>
                </div>
                <div className="item-nav">
                    <ButtonAction target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn='btn-action-config button-nav' iconFa='fa-solid fa-sliders'/>
                </div>
            </div>
        </div>
    )
}

export default Navigate