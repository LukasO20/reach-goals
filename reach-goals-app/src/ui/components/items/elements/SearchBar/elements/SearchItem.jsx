import PropTypes from 'prop-types'

import { iconMap, visibilityMap, switchLayoutMap } from '../../../../../../utils/mapping/mappingUtils'

import ButtonAction from '../../ButtonAction/ButtonAction'

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

SearchItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    onButtonClick: PropTypes.func
}

export default SearchItem