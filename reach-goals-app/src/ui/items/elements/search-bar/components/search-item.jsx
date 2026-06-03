import { visibilityMap, switchLayoutMap } from '../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../../button-action'
import Tooltip from '../../tooltip'

/** @typedef {import('../types.js').SearchItemProps} Props */

/**
 * @param {Props} props
 */
const SearchItem = ({ item, type, onItemClick, onButtonClick }) => {

    const tooltipPositions = { left: '-100%', top: 'calc(100% + .5rem)', transform: 'translateX(-50%)' }

    return (
        <div className={`item ${type}`}>
            <div className='head'>
                <div className='item-info' onClick={() => onItemClick(item.id, type, item)}>
                    {iconMap[type]}
                    <label>{item.name}</label>
                </div>
                <div className='item-action'>
                    <Tooltip title={`Edit ${type}`} positions={tooltipPositions}>
                        <ButtonAction icon='edit' classBtn='button-action circle small'
                            onClick={() => onButtonClick(item.id, type)}
                            visibility={visibilityMap(['modal-center', type])}
                            switchLayout={switchLayoutMap({
                                area: 'modal',
                                layout: { modalName: 'modal-center', layoutName: 'form' }
                            })}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default SearchItem