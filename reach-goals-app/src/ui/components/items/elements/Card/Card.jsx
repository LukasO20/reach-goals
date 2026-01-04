import { switchLayoutMap, targetMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import PropTypes from 'prop-types'

import moment from 'moment'

import './Card.scss'

const Card = ({ type, model, display, pendingState, clickFunction }) => {
    return model.map(item => {
        const isPending = pendingState?.removing && (item.id || item.tagID) === pendingState?.removingVariables
        const validDisplayType = typeof display.type === 'string' && display.type
        const hasTags = item.tags?.length > 0
        const hasEndDate = item?.end
        const isTypeTag = type === 'tag'
        const itemID = item.id || item.tagID

        return (
            <div className={`${type} ${display.type} ${isPending ? 'pending' : ''}`} id={itemID} key={itemID}
                onClick={validDisplayType ? (e) => clickFunction.card(item, e) : {}}
                style={isTypeTag ? { backgroundColor: `${item.color}30`, borderColor: item.color } : {}}>
                <div className='head'>
                    <label className='line-info'>
                        {iconMap[type]}<label>{item.name}</label>
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
                                                target={targetMap(['modal-center', type])}
                                                switchLayout={switchLayoutMap({
                                                    area: 'modal',
                                                    state: { modalName: 'modal-center', layoutName: 'form' }
                                                })}
                                                classBtn={`edit-${type} button-action circle small`}
                                                icon='edit'
                                            />
                                            <ButtonAction
                                                pendingState={isPending}
                                                onClick={() => clickFunction.delete(itemID)}
                                                target={targetMap(null)}
                                                classBtn={`remove-${type} button-action circle small`}
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

Card.propTypes = {
    type: PropTypes.string.isRequired,
    model: PropTypes.array.isRequired,
    display: PropTypes.exact({
        type: PropTypes.string.isRequired,
        sideAction: PropTypes.bool
    }).isRequired,
    pendingState: PropTypes.shape({
        removing: PropTypes.bool,
        removingVariables: PropTypes.number
    }),
    clickFunction: PropTypes.shape({
        card: PropTypes.func,
        edit: PropTypes.func,
        delete: PropTypes.func
    })
}

export default Card