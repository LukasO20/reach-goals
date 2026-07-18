import { buildCheckboxMap } from '../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../button-action'
import ButtonCheckbox from '../button-checkbox'
import TagsPopover from '../tags-popover'
import Tooltip from '../tooltip'
import Icons from '../icons'
import RightContent from './components/right-content.jsx'

import {
    safeCheckbox,
    safeClickFunction,
    safeDisplay,
    safeItem,
} from './defaults.js'
import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').CardMiniProps} Props */

/**
 * @param {Props} props
 */
const CardMini = ({
    type,
    item = safeItem,
    display = safeDisplay,
    pendingState,
    dragProvided,
    checkboxState = safeCheckbox,
    clickFunction = safeClickFunction,
    checkboxModel,
    showTags,
}) => {
    const itemID = item.id || item.tagID
    const tagCardStyle =
        type === 'tag' ? { backgroundColor: `${item.color}` } : null
    const selectedDisplayType = display.type[0]
    const selectedCheckboxList = checkboxState?.page?.selected ?? []

    const isPending =
        pendingState?.removing &&
        (item.id || item.tagID) === pendingState?.removingVariables

    const isSelected = !!selectedCheckboxList.includes(`checkbox-${itemID}`)

    const validIconStatus = item.status && item.status !== 'progress'

    const cardMiniClass = cx(`
        ${type}
        ${selectedDisplayType}
        ${isSelected && 'selected'}
        ${isPending && 'pending'}
    `)

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
                <div className='title'>
                    {checkboxModel && (
                        <ButtonCheckbox
                            classBtn='checkbox-card-mini'
                            checkboxID={`checkbox-${itemID}`}
                            checkbox={buildCheckboxMap({
                                checkboxID: `checkbox-${itemID}`,
                                scope: 'page',
                            })}
                        />
                    )}
                    {validIconStatus && (
                        <span className={`status ${item.status}`}>
                            <Icons icon={`icon-${item.status}`} size='medium' />
                        </span>
                    )}
                    <Icons icon={`icon-${type}`} />
                    <label>{item.name}</label>
                </div>
                <RightContent
                    type={type}
                    item={item}
                    display={display}
                    showTags={showTags}
                    pendingState={pendingState}
                    clickFunction={clickFunction}
                />
            </div>
        </div>
    )
}

export default CardMini
