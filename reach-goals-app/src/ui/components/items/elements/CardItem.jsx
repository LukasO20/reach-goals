import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

import ButtonAction from './ButtonAction.jsx'
import { switchLayoutMap, targetMap } from '../../../../utils/mapping/mappingUtils.js'

const iconMap = {
    goal: 'fa-solid fa-bullseye',
    assignment: 'fa-solid fa-list-check',
    tag: 'fa-solid fa-tag',
    undefined: 'fa-solid fa-exclamation'
}

const renderCard = ({ type, model, clickFunction, display }, { currentLocation }) => {

    return model.map(model => (
        <div className={`${type} ${display.type}`} id={model.id} key={model.id} onClick={(e) => clickFunction.card(model.id, e)}>
            {
                display.type === 'card' ?
                    <Link to={`${currentLocation}/details`}>
                        <div className='head'>
                            <label className='line-info'><i className={`icon-st ${iconMap[type]}`}></i><label>{model.name}</label></label>
                        </div>
                        <div className='body'></div>
                    </Link>
                    :
                    <div className='head'>
                        <label className='line-info'><i className={`icon-st ${iconMap[type]}`}></i><label>{model.name}</label></label>
                    </div>
            }
            {
                display.sideAction &&
                <div className='side-actions'>
                    {
                        display.type === 'mini-list' && (type === 'assignment' || type === 'tag')
                            ?
                            <ButtonAction onClick={({ e }) => clickFunction.aux(model.id, e)} classBtn={`remove-${type}-dom`} iconFa='fa-solid fa-xmark' />
                            :
                            <>
                                <ButtonAction onClick={() => clickFunction.edit(model.id)} target={targetMap(['panel-center', type])} switchLayout={switchLayoutMap('panel', 'layout', 'center')} classBtn={`edit-${type}`} iconFa='fa-regular fa-pen-to-square' />
                                <ButtonAction onClick={() => clickFunction.delete(model.id)} target={targetMap(null)} classBtn={`remove-${type}`} iconFa='fa-regular fa-trash-can' />
                            </>
                    }
                </div>
            }
        </div>
    ))
}

const CardItem = (props) => {
    const cardProps = {
        type: props.type || 'undefined',
        model: props.model || {},
        clickFunction: props.clickFunction || null,
        display: props.display || { type: 'mini-list', sideAction: false }
    }

    const location = useLocation()
    const hooks = {
        currentLocation: useMemo(() => {
            return location.pathname.includes('/objectives') ? '/objectives' : location.pathname.includes('/home') ? '/home' : '/calendar'
        }, [location.pathname])
    }

    return (renderCard(cardProps, hooks))
}

export default CardItem