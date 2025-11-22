import { Link } from 'react-router-dom'

import { switchLayoutMap, targetMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import '../CardItem/CardItem.scss'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import moment from 'moment'

const renderCard = ({ type, model, clickFunction, display }, page) => {      
    return model.map(model => (
        model && 
            <div className={`${type} ${display.type}`} id={model.id || model.tagID} key={model.id || model.tagID}
                onClick={typeof display.type === 'string' && display.type !== '' ? (e) => clickFunction.card(model, e) : undefined}
                style={ type === 'tag' ? { backgroundColor: `${model.color}30`, borderColor: model.color } : {} }>
                {
                    display.type === 'card' ?
                        <Link to={`/${page}/details`}>
                            <div className='head'>
                                <label className='line-info'>{iconMap[type]}<label>{model.name}</label></label>
                            </div>
                            <div className='body'>
                                {
                                    model?.end &&
                                    <label className='line-info date'>
                                        {iconMap['schedule']}
                                        <span>
                                            Ends on {moment(model.end).format('DD MMMM')}
                                        </span> 
                                    </label>
                                }
                                <label className='line-info description'>
                                    {model.description}
                                </label>
                            </div>
                        </Link>
                        :
                    display.type === 'mini-card' ?
                        <Link to={`/${page}/details`}>
                            <label className='line-info'>{iconMap[type]}<label>{model.name}</label></label>
                        </Link>
                        :
                        null
                }
                {
                    display.sideAction &&
                        <div className='side-actions'>
                            {
                                display.type === 'card'
                                    ?
                                    <>
                                        <ButtonAction onClick={() => clickFunction.edit(model.id || model.tagID)} target={targetMap(['panel-center', type])} switchLayout={switchLayoutMap({ page: page, name: 'panel', layout: 'layout', value: 'center' })} 
                                            classBtn={`edit-${type} button-action circle small`} icon='edit' />
                                        <ButtonAction onClick={() => clickFunction.delete(model.id || model.tagID)} target={targetMap(null)} 
                                            classBtn={`remove-${type} button-action circle small`} icon='remove' />
                                    </>
                                    :
                                    <ButtonAction onClick={() => clickFunction.aux(model, model.type)} classBtn={`remove-${type}-dom remove-dom`} icon='close' />
                            }
                        </div>
                }
        </div>
    ))
}

const CardItem = (props) => { 
    const { layoutComponent } = useSwitchLayout()
    const cardProps = {
        type: props.type || 'undefined',
        model: props.model || {},
        clickFunction: props.clickFunction || null,
        display: props.display || { type: 'mini-card', sideAction: false }
    }

    return (renderCard(cardProps, layoutComponent.page))
}

export default CardItem