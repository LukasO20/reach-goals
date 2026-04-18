import { visibilityMap, switchLayoutMap } from '../../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../../button-action'

/** @typedef {import('../types.js').SearchItemProps} Props */

/**
 * @param {Props} props
 */
const SearchItem = ({ item, type, onItemClick, onButtonClick }) => {
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