import { displayModesMap, visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../utils/mapping/mappingUtils.js'
import { checkboxMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../button-action'
import ButtonCheckbox from '../button-checkbox'
import TagsPopover from '../tags-popover'
import Tooltip from '../tooltip'
import Icons from '../icons'

import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').CardMiniProps} Props */

/**
 * @param {Props} props
 */
const CardMini = ({
    type,
    item = {},
    display,
    pendingState,
    dragProvided,
    checkboxState = checkboxMap,
    clickFunction,
    checkboxModel,
    showTags,
}) => {
    const itemID = item.id || item.tagID
    const tagCardStyle = type === 'tag' ? { backgroundColor: `${item.color}` } : null
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

    const validIconStatus = item.status && item.status !== 'progress'

    const cardMiniClass = cx(`
                ${type}
                ${selectedDisplayType}
                ${isSelected && 'selected'}
            `)

    const tooltipPositions = { left: '50%', top: 'calc(100% + .5rem)', transform: 'translateX(-75%)' }

    return (
        <div
            className={cardMiniClass}
            id={itemID}
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
                        <span className={`status ${item.status}`}>
                            <Icons icon={`icon-${item.status}`} size='medium' />
                        </span>
                    )}
                    <Icons icon={`icon-${type}`} />
                    <label>{item.name}</label>
                </div>
                {(hasTags || hasSideActions) && (
                    <div className='side-right'>
                        {hasSideActions && (
                            <>
                                {isDisplayActionEdit && (
                                    <Tooltip title={`Edit ${type}`} positions={tooltipPositions}>
                                        <ButtonAction
                                            onClick={() => clickFunction.edit(itemID)}
                                            visibility={visibilityMap(['modal-center', type])}
                                            switchLayout={switchLayoutMap({
                                                area: 'modal',
                                                layout: { modalName: 'modal-center', layoutName: 'form' }
                                            })}
                                            classBtn={`edit-${type} button-action circle small`}
                                            icon='icon-edit'
                                        />
                                    </Tooltip>
                                )}
                                {isDisplayActionDelete && (
                                    <Tooltip title={`Delete ${type}`} positions={tooltipPositions}>
                                        <ButtonAction
                                            pendingState={isPending}
                                            onClick={() => clickFunction.delete(itemID)}
                                            visibility={visibilityMap(null)}
                                            classBtn={`remove-${type} button-action circle small`}
                                            icon='icon-trash'
                                        />
                                    </Tooltip>
                                )}
                                {isDisplayActionRemove && (
                                    <ButtonAction
                                        onClick={() => clickFunction.aux(item, type)}
                                        classBtn={`remove-${type}-dom button-action text-icon circle`}
                                        icon='icon-close'
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
}

export default CardMini