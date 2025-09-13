import { Link } from 'react-router-dom'

import { switchLayoutMap, targetMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import '../CardItem/CardItem.scss'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

const renderCard = ({ type, model, clickFunction, display }, page) => {    
    return model.map(model => (
        <div className={`${type} ${display.type}`} id={model.id || model.tagID} key={model.id || model.tagID}
            onClick={typeof display.type === 'string' && display.type !== '' ? (e) => clickFunction.card(model.id || model.tagID, e) : undefined}>
            {
                display.type === 'card' ?
                    <Link to={`/${page}/details`}>
                        <div className='head'>
                            <label className='line-info'>{iconMap[type]}<label>{model.name}</label></label>
                        </div>
                        <div className='body'>
                            <label className='line-info'>
                                {model.description}
                            </label>
                        </div>
                    </Link>
                    :
                    <div className='head'>
                        <label className='line-info'>{iconMap[type]}<label>{model.name}</label></label>
                    </div>
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
                            <ButtonAction onClick={() => clickFunction.aux(model.id || model.tagID, 'delete', model.type)} classBtn={`remove-${type}-dom`} icon='close' />
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
        display: props.display || { type: 'mini-list', sideAction: false }
    }

    return (renderCard(cardProps, layoutComponent.page))
}

export default CardItem