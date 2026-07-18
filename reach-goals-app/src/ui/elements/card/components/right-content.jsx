import ButtonAction from '../../button-action'
import Icons from '../../icons'
import Tooltip from '../../tooltip'

import {
    visibilityMap,
    switchLayoutMap,
} from '../../../../utils/mapping/mappingUtils'

/** @typedef {import('../types.js').RightContentProps} Props */

/**
 * @param {Props} props
 */
const RightContent = ({ type, item, display, pendingState, clickFunction }) => {
    const itemID = item.id

    const validIconStatus = item.status !== 'progress'

    const isPending = !!(
        pendingState?.removing &&
        (item.id || item.tagID) === pendingState?.removingVariables
    )

    const tooltipPositions = {
        left: '50%',
        top: 'calc(100% + .5rem)',
        transform: 'translateX(-75%)',
    }

    const isDisplayActionEdit = display.actions.includes('edit')

    const isDisplayActionDelete = display.actions.includes('delete')

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
                        classBtn={`edit-${type} circle small`}
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
                        classBtn={`remove-${type} circle small`}
                        icon='icon-trash'
                    />
                </Tooltip>
            )}
            {validIconStatus && (
                <span className={`status ${item.status}`}>
                    <Icons icon={`icon-${item.status}`} size='medium' />
                </span>
            )}
        </div>
    )
}

export default RightContent
