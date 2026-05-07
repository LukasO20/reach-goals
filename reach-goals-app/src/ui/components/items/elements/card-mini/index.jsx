import { Draggable } from '@adaptabletools/react-beautiful-dnd'

import { displayModesMap, visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../../utils/mapping/mappingUtils.js'
import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../button-action'
import ButtonCheckbox from '../button-checkbox'
import TagsPopover from '../tags-popover/index.jsx'

import { cx } from '../../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').CardMiniProps} Props */

/**
 * @param {Props} props
 */
const CardMini = ({
    type,
    model,
    display,
    pendingState,
    checkboxState = checkboxMap,
    clickFunction,
    checkboxModel,
    showTags,
    status = [],
    draggable
}) => {
    return model
        .filter((item) => status.includes(item.status) || true)
        .map((item, index) => {
            const itemID = item.id || item.tagID
            const tagCardStyle = type === 'tag' ? { backgroundColor: `${item.color}30`, borderColor: item.color } : null
            const selectedDisplayType = display.type[0]
            const selectedCheckboxList = checkboxState?.page?.selected ?? []

            const isPending = pendingState?.removing && (item.id || item.tagID) === pendingState?.removingVariables

            const isDisplayActionEdit = display.actions.includes('edit')
                && displayModesMap.actions.includes('edit')

            const isDisplayActionRemove = display.actions.includes('remove')
                && displayModesMap.actions.includes('remove')

            const isDisplayActionDelete = display.actions.includes('delete')
                && displayModesMap.actions.includes('delete')

            const isSelected = !!selectedCheckboxList.includes(`checkbox-${itemID}`)

            const hasTags = item.tags?.length > 0 && showTags

            const hasSideActions = isDisplayActionEdit || isDisplayActionRemove || isDisplayActionDelete

            const iconStatus = item.status === 'conclude' ? 'check' : item.status

            const validIconStatus = item.status && item.status !== 'progress'

            const cardMiniClass = cx(`
                ${type}
                ${selectedDisplayType}
                ${isSelected && 'selected'}
            `)

            const renderCardMini = (dragProvided) => (
                <div
                    className={cardMiniClass}
                    id={itemID}
                    key={!draggable ? itemID : null}
                    onClick={(e) => clickFunction.card(item, e)}
                    style={tagCardStyle}
                    ref={dragProvided?.innerRef}
                    {...dragProvided?.draggableProps}
                    {...dragProvided?.dragHandleProps}
                >
                    <div className='body'>
                        <div className='side-left'>
                            {checkboxModel && (
                                <ButtonCheckbox classBtn='checkbox-card-mini' checkboxID={`checkbox-${itemID}`}
                                    checkbox={buildCheckboxMap({ checkboxID: `checkbox-${itemID}`, scope: 'page' })} />
                            )}
                            {validIconStatus && (
                                <label className={`status ${item.status}`}>
                                    {iconMap[iconStatus]}
                                </label>
                            )}
                            {iconMap[type]}
                            <span className='title'>{item.name}</span>
                        </div>
                        {(hasTags || hasSideActions) && (
                            <div className='side-right'>
                                {hasSideActions && (
                                    <>
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
                                        {isDisplayActionRemove && (
                                            <ButtonAction
                                                onClick={() => clickFunction.aux(item, type)}
                                                classBtn={`remove-${type}-dom button-action text-icon circle`}
                                                icon='close'
                                            />
                                        )}
                                    </>
                                )}
                                {hasTags && (<TagsPopover tags={item.tags} visibility={`tag-popover-${item.id}`} />)}
                            </div>
                        )}
                    </div>
                </div>
            )


            return draggable ? (
                <Draggable draggableId={String(itemID)} index={index} key={String(itemID)}>
                    {(provided) => renderCardMini(provided)}
                </Draggable>
            ) : (
                renderCardMini()
            )
        }
        )
}

export default CardMini