import { switchLayoutMap, visibilityMap, iconMap, displayModesMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import PropTypes from 'prop-types'

import moment from 'moment'

import './Card.scss'

const Card = ({ type, model = [], display, pendingState, clickFunction }) => {
    return model.map(item => {
        const hasTags = item.tags?.length > 0
        const hasEndDate = item.end
        const itemID = item.id || item.tagID

        const tagCardStyle = type === 'tag' ? { backgroundColor: `${item.color}30`, borderColor: item.color } : null

        const selectedDisplayType = display.type[0]

        const isPending = pendingState?.removing && (item.id || item.tagID) === pendingState?.removingVariables

        const isDisplayActionEdit = display.actions.includes('edit')
            && displayModesMap.actions.includes('edit')

        const isDisplayActionDelete = display.actions.includes('delete')
            && displayModesMap.actions.includes('delete')

        const renderTagBox = () => {
            return (
                <div className='tag-box'>
                    {item.tags.slice(0, 3).map(data => {
                        const styleProps = { backgroundColor: `${data.tag.color}30`, borderColor: data.tag.color }
                        return (
                            <label key={data.tag.name} style={styleProps}>
                                {data.tag.name}
                            </label>
                        )
                    })}
                    {item.tags.slice(3).length > 0 && (
                        <label className='count'>
                            <span className='icon-st'>{iconMap['plus']}</span>
                            {item.tags.slice(3).length}
                        </label>
                    )}
                </div>
            )
        }

        const renderEndDate = () => {
            return (
                <label className='line-info date'>
                    {iconMap['schedule']}
                    <span>Ends on {moment(item.end).format('DD MMMM')}</span>
                </label>
            )
        }

        return (
            <div className={`${type} ${selectedDisplayType} ${isPending ? 'pending' : ''}`} id={itemID} key={itemID}
                onClick={(e) => clickFunction?.card(item, e)} style={tagCardStyle}>
                <div className='head'>
                    <label className='line-info'>
                        {iconMap[type]}<label>{item.name}</label>
                    </label>
                    {hasTags && renderTagBox()}
                </div>
                <div className='body'>
                    {hasEndDate && renderEndDate()}
                    <div className='item'>
                        <label className='line-info description'>{item.description}</label>
                        <div className='side-actions'>
                            <div className='item-actions'>
                                {isDisplayActionEdit &&
                                    <ButtonAction
                                        onClick={() => clickFunction.edit(itemID)}
                                        visibility={visibilityMap(['modal-center', type])}
                                        switchLayout={switchLayoutMap({
                                            area: 'modal',
                                            state: { modalName: 'modal-center', layoutName: 'form' }
                                        })}
                                        classBtn={`edit-${type} button-action circle small`}
                                        icon='edit'
                                    />}
                                {isDisplayActionDelete &&
                                    <ButtonAction
                                        pendingState={isPending}
                                        onClick={() => clickFunction.delete(itemID)}
                                        visibility={visibilityMap(null)}
                                        classBtn={`remove-${type} button-action circle small`}
                                        icon='remove'
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

Card.propTypes = {
    type: PropTypes.string.isRequired,
    model: PropTypes.array.isRequired,
    display: PropTypes.shape({
        type: PropTypes.arrayOf(
            PropTypes.oneOf(['card', 'card-mini'])
        ).isRequired,
        actions: PropTypes.arrayOf(
            PropTypes.oneOf(['edit', 'delete', 'details'])
        )
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