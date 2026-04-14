import { Draggable } from '@adaptabletools/react-beautiful-dnd'

import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'
import { switchLayoutMap, visibilityMap, displayModesMap, buildCheckboxMap } from '../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../ButtonCheckbox/ButtonCheckbox.jsx'
import CardMiniTag from '../CardMiniTag/CardMiniTag.jsx'

import { cx } from '../../../../../utils/utils.js'

import moment from 'moment'

import './Card.scss'

/**
 * @param {Object} props
 * @param {string} props.type
 * @param {Array} props.model
 * @param {Object} props.display
 * @param {boolean} props.pendingState
 * @param {boolean} props.showTags
 * @param {boolean} props.status
 * @param {Object} props.checkboxState
 * @param {Function} props.clickFunction
 * @param {boolean} props.draggable
 */

const Card = ({
    type,
    model,
    display,
    pendingState,
    showTags = true,
    status,
    checkboxState = checkboxMap,
    clickFunction,
    draggable = false
}) => {
    return model
        .filter((item) => status?.includes(item.status))
        .sort((a, b) => a.order - b.order)
        .map((item, index) => {
            const hasTags = item.tags?.length > 0 && showTags
            const hasEndDate = item.end
            const itemID = item.id || item.tagID

            const tagCardStyle = type === 'tag' ? { backgroundColor: `${item.color}30`, borderColor: item.color } : null

            const selectedDisplayType = display.type[0]

            const selectedCheckboxList = checkboxState.page.selected

            const validIconStatus = item.status !== 'progress'

            const iconStatus = item.status === 'conclude' ? 'check' : item.status

            const isPending = !!(pendingState?.removing && (item.id || item.tagID) === pendingState?.removingVariables)

            const isSelected = !!selectedCheckboxList.includes(`checkbox-${itemID}`)

            const isDisplayActionEdit = display.actions.includes('edit')
                && displayModesMap.actions.includes('edit')

            const isDisplayActionDelete = display.actions.includes('delete')
                && displayModesMap.actions.includes('delete')

            const cardClass = cx(
                `${type}
                ${selectedDisplayType}
                ${isPending && 'pending'}
                ${isSelected && 'selected'}
                `
            )

            const renderEndDate = () => {
                return (
                    <label className='line-info date'>
                        {iconMap['schedule']}
                        <span>Ends on {moment(item.end).format('DD MMMM')}</span>
                    </label>
                )
            }

            const renderCard = (dragProvided) => (
                <div
                    className={cardClass}
                    id={itemID}
                    key={!draggable ? itemID : null}
                    onClick={(e) => clickFunction?.card(item, e)}
                    style={tagCardStyle}
                    ref={dragProvided?.innerRef}
                    {...dragProvided?.draggableProps}
                    {...dragProvided?.dragHandleProps}
                >
                    <div className='head'>
                        <div className='left-side'>
                            <ButtonCheckbox classBtn='checkbox-card' checkboxID={`checkbox-${itemID}`}
                                checkbox={buildCheckboxMap({ checkboxID: `checkbox-${itemID}`, scope: 'page' })} />
                            <label className='line-info'>
                                {iconMap[type]}
                                <label>{item.name}</label>
                            </label>
                        </div>
                        {hasTags && (
                            <div className='right-side'>
                                <CardMiniTag tags={item.tags} />
                            </div>
                        )}
                    </div>
                    <div className='body'>
                        {!!hasEndDate && renderEndDate()}
                        <div className='item'>
                            <label className='line-info description'>{item.description}</label>
                            <div className='side actions'>
                                <div className='item-actions'>
                                    {isDisplayActionEdit && (
                                        <ButtonAction
                                            onClick={() => clickFunction.edit(itemID)}
                                            visibility={visibilityMap(['modal-center', type])}
                                            switchLayout={switchLayoutMap({
                                                area: 'modal',
                                                state: { modalName: 'modal-center', layoutName: 'form' }
                                            })}
                                            classBtn={`edit-${type} button-action circle small`}
                                            icon='edit'
                                        />
                                    )}
                                    {isDisplayActionDelete && (
                                        <ButtonAction
                                            pendingState={isPending}
                                            onClick={() => clickFunction.delete(itemID)}
                                            visibility={visibilityMap(null)}
                                            classBtn={`remove-${type} button-action circle small`}
                                            icon='remove'
                                        />
                                    )}
                                </div>
                            </div>
                            {validIconStatus && (
                                <div className='side info'>
                                    <span className={`status ${item.status}`}>{iconMap[iconStatus]}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )

            return draggable ? (
                <Draggable draggableId={String(itemID)} index={index} key={String(itemID)}>
                    {(provided) => renderCard(provided)}
                </Draggable>
            ) : (
                renderCard()
            )
        })
}

export default Card