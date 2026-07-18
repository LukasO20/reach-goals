import {
    visibilityMap,
    switchLayoutMap,
} from '../../../../utils/mapping/mappingUtils'

import ButtonAction from '../../button-action'
import Icons from '../../icons'
import Tooltip from '../../tooltip'
import TagsPopover from '../../tags-popover/index.jsx'

/** @typedef {import('../types.js').RightContentProps} Props */

/**
 * @param {Props} props
 */
const RightContent = ({
    type,
    item,
    display,
    pendingState,
    showTags,
    clickFunction,
}) => {
    const itemID = item.id

    const tooltipPositions = {
        left: '50%',
        top: 'calc(100% + .5rem)',
        transform: 'translateX(-75%)',
    }

    const isPending = !!(
        pendingState?.removing &&
        (item.id || item.tagID) === pendingState?.removingVariables
    )

    const hasTags = !!item.tags?.length

    const isDisplayActionEdit = display.actions.includes('edit')

    const isDisplayActionDelete = display.actions.includes('delete')

    const isDisplayActionRemove = display.actions.includes('remove')

    const shouldNotRenderContent =
        !hasTags &&
        !isDisplayActionEdit &&
        !isDisplayActionDelete &&
        !isDisplayActionRemove

    if (shouldNotRenderContent) return null

    return (
        <div className='right-content'>
            {isDisplayActionEdit && (
                <Tooltip title={`Edit ${type}`} positions={tooltipPositions}>
                    <ButtonAction
                        onClick={() => clickFunction.edit(itemID)}
                        visibility={visibilityMap(['modal-center', type])}
                        switchLayout={switchLayoutMap({
                            area: 'modal',
                            layout: {
                                modalName: 'modal-center',
                                layoutName: 'form',
                            },
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
            {hasTags && (
                <TagsPopover
                    tags={item.tags}
                    visibility={`tag-popover-${item.id}`}
                />
            )}
        </div>
    )
}

export default RightContent
