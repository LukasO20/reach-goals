import { Link } from 'react-router-dom'

import { switchLayoutMap, targetMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../../utils/utils.js'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import moment from 'moment'

import './Card.scss'

const Card = (props) => {
    const { type, model, display, pendingState, clickFunction } = props
    const { layoutComponent } = useSwitchLayout()

    const requiredSuccessful = hasRequiredProps(props, ['type', 'model', 'display', 'pendingState', 'clickFunction'])
    if (!requiredSuccessful) return null

    return model.map(item => {
        const isPending = pendingState?.removing && (item.id || item.tagID) === pendingState?.removingVariables
        const validDisplayType = typeof display.type === 'string' && display.type
        const hasTags = item.tags?.length > 0
        const hasEndDate = item?.end
        const isTypeTag = type === 'tag'
        const itemID = item.id || item.tagID
        const avaiableType = type ?? item.type

        return (
            <div className={`${avaiableType} ${display.type} ${isPending ? 'pending' : ''}`} id={itemID} key={itemID}
                onClick={validDisplayType ? (e) => clickFunction.card(item, e) : {}}
                style={isTypeTag ? { backgroundColor: `${item.color}30`, borderColor: item.color } : {}}>
                <div className='head'>
                    <Link to={`/${layoutComponent.page}/details`}>
                        <label className='line-info'>
                            {iconMap[avaiableType]}<label>{item.name}</label>
                        </label>
                        {
                            hasTags && (
                                <div className='tag-box'>
                                    {
                                        item.tags.slice(0, 3).map(data => (
                                            <label key={data.tag.name} style={{ backgroundColor: `${data.tag.color}30`, borderColor: data.tag.color }}>
                                                {data.tag.name}
                                            </label>
                                        ))
                                    }
                                    {
                                        item.tags.slice(3).length > 0 && (
                                            <label className='count'>
                                                <span className='icon-st'>{iconMap['plus']}</span>
                                                {item.tags.slice(3).length}
                                            </label>
                                        )
                                    }
                                </div>
                            )
                        }
                    </Link>
                </div>
                <div className='body'>
                    {
                        hasEndDate && (
                            <label className='line-info date'>
                                {iconMap['schedule']}
                                <span>Ends on {moment(item.end).format('DD MMMM')}</span>
                            </label>
                        )
                    }
                    <div className='item'>
                        <label className='line-info description'>{item.description}</label>
                        {
                            display.sideAction && (
                                <div className='side-actions'>
                                    <div className='item-actions'>
                                        <div className='item'>
                                            <ButtonAction
                                                onClick={() => clickFunction.edit(itemID)}
                                                target={targetMap(['panel-center', avaiableType])}
                                                switchLayout={switchLayoutMap({
                                                    page: layoutComponent.page,
                                                    name: 'panel',
                                                    layout: 'layout',
                                                    value: 'center'
                                                })}
                                                classBtn={`edit-${avaiableType} button-action circle small`}
                                                icon='edit'
                                            />
                                            <ButtonAction
                                                pendingState={isPending}
                                                onClick={() => clickFunction.delete(itemID)}
                                                target={targetMap(null)}
                                                classBtn={`remove-${avaiableType} button-action circle small`}
                                                icon='remove'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    })
}

export default Card