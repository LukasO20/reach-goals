import { checkboxMap } from '../../../utils/mapping/mappingUtilsProvider.js'
import { buildCheckboxMap } from '../../../utils/mapping/mappingUtils.js'

import Icons from '../icons'
import ButtonCheckbox from '../button-checkbox'
import TagsPopover from '../tags-popover'
import EndDate from './components/end-date.jsx'
import RightContent from './components/right-content.jsx'

import { safeClickFunction, safeDisplay, safeItem } from './defaults.js'
import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').CardProps} Props */

/**
 * @param {Props} props
 */
const Card = ({
    type,
    item = safeItem,
    display = safeDisplay,
    pendingState,
    dragProvided,
    showTags = true,
    checkboxState = checkboxMap,
    clickFunction = safeClickFunction,
}) => {
    const itemID = item.id

    const tagCardStyle =
        type === 'tag'
            ? { backgroundColor: `${item.color}30`, borderColor: item.color }
            : null

    const selectedDisplayType = display.type[0]

    const selectedCheckboxList = checkboxState.page.selected

    const isPending = !!(
        pendingState?.removing &&
        (item.id || item.tagID) === pendingState?.removingVariables
    )

    const isSelected = !!selectedCheckboxList.includes(`checkbox-${itemID}`)

    const cardClass = cx(`
        ${type}
        ${selectedDisplayType}
        ${isPending && 'pending'}
        ${isSelected && 'selected'}
    `)

    return (
        <div
            className={cardClass}
            id={itemID}
            onClick={(e) => clickFunction.card(item, e)}
            style={tagCardStyle}
            ref={dragProvided?.innerRef}
            {...dragProvided?.draggableProps}
            {...dragProvided?.dragHandleProps}
        >
            <div className='head'>
                <div className='title'>
                    <ButtonCheckbox
                        classBtn='checkbox-card'
                        checkboxID={`checkbox-${itemID}`}
                        checkbox={buildCheckboxMap({
                            checkboxID: `checkbox-${itemID}`,
                            scope: 'page',
                        })}
                    />
                    <label>
                        <Icons icon={`icon-${type}`} />
                        <label>{item.name}</label>
                    </label>
                </div>
                {showTags && (
                    <TagsPopover
                        tags={item.tags}
                        visibility={`tag-popover-${item.id}`}
                    />
                )}
            </div>
            <div className='body'>
                <EndDate end={item.end} />
                <div className='details'>
                    <div className='description'>{item.description}</div>
                    <RightContent
                        type={type}
                        item={item}
                        display={display}
                        clickFunction={clickFunction}
                        pendingState={pendingState}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card
