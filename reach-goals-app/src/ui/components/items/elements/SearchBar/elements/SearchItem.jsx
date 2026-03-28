import { visibilityMap, switchLayoutMap } from '../../../../../../utils/mapping/mappingUtils'
import { iconMap } from '../../../../../../utils/mapping/mappingIcons'

import ButtonAction from '../../ButtonAction/ButtonAction'

export const SearchItemMap = {
    item: {},
    type: '',
    onItemClick: () => {},
    onButtonClick: () => {}
}

/**
 * @param {Object} SearchItemMap
 * @param {Object} SearchItemMap.item
 * @param {string} SearchItemMap.type
 * @param {Function} [SearchItemMap.onItemClick]
 * @param {Function} [SearchItemMap.onButtonClick]
 */

const SearchItem = ({ item, type, onItemClick, onButtonClick } = SearchItemMap) => {
    return (
        <div className={`item ${type}`}>
            <div className='head'>
                <div className='item-info' onClick={() => onItemClick(item.id, type, item)}>
                    {iconMap[type]}
                    <label>{item.name}</label>
                </div>
                <div className='item-action'>
                    <ButtonAction icon='edit' classBtn='button-action circle small'
                        onClick={() => onButtonClick(item.id, type)}
                        visibility={visibilityMap(['modal-center', type])}
                        switchLayout={switchLayoutMap({
                            area: 'modal',
                            state: { modalName: 'modal-center', layoutName: 'form' }
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchItem