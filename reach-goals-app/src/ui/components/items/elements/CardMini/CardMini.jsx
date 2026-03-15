import { displayModesMap, visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../../utils/mapping/mappingUtils.js'
import { checkboxMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../ButtonCheckbox/ButtonCheckbox.jsx'

import PropTypes from 'prop-types'

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
    }
}

const CardMini = ({ type, model, display, pendingState, checkboxState, clickFunction, checkboxModel } = CardMiniMap) => {
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

        const isSelected = selectedCheckboxList.includes(`checkbox-${itemID}`) ? 'selected' : ''

        return (
            <div className={`${type} ${selectedDisplayType} ${isSelected}`} id={itemID} key={itemID}
                onClick={(e) => clickFunction.card(item, e)} style={tagCardStyle}>
                <label className='line-info'>
                    {checkboxModel && (
                        <ButtonCheckbox classBtn='checkbox-card-mini' checkboxID={`checkbox-${itemID}`}
                            checkbox={buildCheckboxMap({ checkboxID: `checkbox-${itemID}`, scope: 'page' })} />
                    )}
                    {iconMap[type]}
                    <label>{item.name}</label>
                </label>
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
            </div>
        )
    }
    )
}

CardMini.propTypes = {
    type: PropTypes.string.isRequired,
    model: PropTypes.array.isRequired,
    display: PropTypes.shape({
        type: PropTypes.arrayOf(
            PropTypes.oneOf(['card', 'card-mini'])
        ).isRequired,
        actions: PropTypes.arrayOf(
            PropTypes.oneOf(['edit', 'remove'])
        )
    }).isRequired,
    clickFunction: PropTypes.shape({
        card: PropTypes.func,
        aux: PropTypes.func,
    })
}

export default CardMini