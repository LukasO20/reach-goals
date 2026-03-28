import { displayModesMap, visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../../utils/mapping/mappingUtils.js'
import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../ButtonCheckbox/ButtonCheckbox.jsx'
import CardMiniTag from '../CardMiniTag/CardMiniTag.jsx'

import './CardMini.scss'

export const CardMiniMap = {
    type: '',
    model: [],
    display: displayModesMap,
    pendingState: false,
    checkboxState: checkboxMap,
    checkboxModel: false,
    clickFunction: {
        card: () => null,
        edit: () => null,
        delete: () => null
    },
    showTags: false,
    showStatus: false
}

/**
 * @param {Object} CardMiniMap
 * @param {string} CardMiniMap.type
 * @param {Array} CardMiniMap.model
 * @param {Object} CardMiniMap.display
 * @param {('card'|'card-mini')[]} CardMiniMap.display.type
 * @param {('edit'|'delete'|'details'|'remove')[]} [CardMiniMap.display.actions]
 * @param {boolean} CardMiniMap.pendingState
 * @param {Object} CardMiniMap.checkboxState
 * @param {boolean} CardMiniMap.checkboxModel
 * @param {Object} CardMiniMap.clickFunction
 * @param {Function} CardMiniMap.clickFunction.card
 * @param {Function} CardMiniMap.clickFunction.edit
 * @param {Function} CardMiniMap.clickFunction.delete
 * @param {boolean} CardMiniMap.showTags
 * @param {boolean} CardMiniMap.showStatus
 */

const CardMini = ({
    type,
    model,
    display,
    pendingState,
    checkboxState,
    clickFunction,
    checkboxModel,
    showTags,
    showStatus
} = CardMiniMap) => {
    return model.map(item => {
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

        const isShowTags = showTags && type !== 'tag'

        const isShowStatus = showStatus

        const hasSideActions = isDisplayActionEdit || isDisplayActionRemove || isDisplayActionDelete

        const iconStatus = item.status === 'conclude' ? 'check' : item.status

        const cardMiniClass = cx(
            `
            ${type}
            ${selectedDisplayType}
            ${isSelected && 'selected'}
            `
        )

        return (
            <div className={cardMiniClass} id={itemID} key={itemID}
                onClick={(e) => clickFunction.card(item, e)} style={tagCardStyle}>
                <div className='line-info'>
                    <div className='info-up'>
                        {checkboxModel && (
                            <ButtonCheckbox classBtn='checkbox-card-mini' checkboxID={`checkbox-${itemID}`}
                                checkbox={buildCheckboxMap({ checkboxID: `checkbox-${itemID}`, scope: 'page' })} />
                        )}
                        {isShowStatus && (
                            <label className={`status ${item.status}`}>
                                {iconMap[iconStatus]}
                            </label>
                        )}
                        {iconMap[type]}
                        <span>{item.name}</span>
                    </div>
                </div>
                {isShowTags && (<CardMiniTag tags={item.tags} />)}
                {hasSideActions && (
                    <div className='side-actions'>
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
                            {isDisplayActionRemove && (
                                <ButtonAction
                                    onClick={() => clickFunction.aux(item, type)}
                                    classBtn={`remove-${type}-dom button-action text-icon circle`}
                                    icon='close'
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
    )
}

export default CardMini