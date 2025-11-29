import { Link } from 'react-router-dom'

import { switchLayoutMap, targetMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import '../CardItem/CardItem.scss'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import moment from 'moment'

const Card = ({ type, model, clickFunction, display, page }) => (
    <>
        <div className='head'>
            <Link to={`/${page}/details`}>
                <label className='line-info'>
                    {iconMap[type]}
                    <label>{model.name}</label>
                </label>
                {model.tags?.length > 0 && (
                    <div className='tag-box'>
                        {model.tags.slice(0, 3).map(data => (
                            <label
                                key={data.tag.name}
                                style={{
                                    backgroundColor: `${data.tag.color}30`,
                                    borderColor: data.tag.color
                                }}
                            >
                                {data.tag.name}
                            </label>
                        ))}
                        {model.tags.slice(3).length > 0 && (
                            <label className='count'>
                                <span className='icon-st'>{iconMap['plus']}</span>
                                {model.tags.slice(3).length}
                            </label>
                        )}
                    </div>
                )}
            </Link>
        </div>
        <div className='body'>
            {model?.end && (
                <label className='line-info date'>
                    {iconMap['schedule']}
                    <span>Ends on {moment(model.end).format('DD MMMM')}</span>
                </label>
            )}
            <div className='item'>
                <label className='line-info description'>{model.description}</label>
                {display.sideAction && (
                    <div className='side-actions'>
                        <div className='item-actions'>
                            <div className='item'>
                                <ButtonAction
                                    onClick={() => clickFunction.edit(model.id || model.tagID)}
                                    target={targetMap(['panel-center', type])}
                                    switchLayout={switchLayoutMap({
                                        page,
                                        name: 'panel',
                                        layout: 'layout',
                                        value: 'center'
                                    })}
                                    classBtn={`edit-${type} button-action circle small`}
                                    icon='edit'
                                />
                                <ButtonAction
                                    onClick={() => clickFunction.delete(model.id || model.tagID)}
                                    target={targetMap(null)}
                                    classBtn={`remove-${type} button-action circle small`}
                                    icon='remove'
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
);

const MiniCard = ({ type, model, clickFunction, display, page }) => (
    <>
        <Link to={`/${page}/details`}>
            <label className='line-info'>
                {iconMap[type]}
                <label>{model.name}</label>
            </label>
        </Link>
        {display.sideAction && (
            <div className='side-actions'>
                <ButtonAction
                    onClick={() => clickFunction.aux(model, model.type)}
                    classBtn={`remove-${type}-dom remove-dom`}
                    icon='close'
                />
            </div>
        )}
    </>
);

const CardItem = (props) => {
    const { layoutComponent } = useSwitchLayout()
    const cardProps = {
        type: props.type || 'undefined',
        model: props.model || [],
        clickFunction: props.clickFunction || null,
        display: props.display || { type: 'mini-card', sideAction: false }
    }

    const cards = {
        card: Card,
        'mini-card': MiniCard
    }

    const Render = cards[cardProps.display.type];

    return (
        cardProps.model.map(model => (
            <div className={`${cardProps.type} ${cardProps.display.type}`} id={model.id || model.tagID} key={model.id || model.tagID}
                onClick={typeof cardProps.display.type === 'string' && cardProps.display.type ? (e) => cardProps.clickFunction.card(model, e) : {}}
                style={cardProps.type === 'tag' ? { backgroundColor: `${model.color}30`, borderColor: model.color } : {}}>
                {
                    Render ? <Render type={cardProps.type} model={model} clickFunction={cardProps.clickFunction}
                        display={cardProps.display} page={layoutComponent.page} /> : null
                }
            </div>
        ))
    )
}

export default CardItem