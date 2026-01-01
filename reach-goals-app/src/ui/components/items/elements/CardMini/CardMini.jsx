import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import PropTypes from 'prop-types'

import './CardMini.scss'

const CardMini = ({ type, model, display, clickFunction }) => {
    return model.map(item => {
        const itemID = item.id || item.tagID
        const isTypeTag = type === 'tag'

        return (
            <div className={`${type} ${display.type}`} id={itemID} key={itemID}
                onClick={typeof display.type === 'string' && display.type ? (e) => clickFunction.card(item, e) : {}}
                style={isTypeTag ? { backgroundColor: `${item.color}30`, borderColor: item.color } : {}}>
                <label className='line-info'>
                    {iconMap[type]}
                    <label>{item.name}</label>
                </label>
                {
                    display.sideAction && (
                        <div className='side-actions'>
                            <ButtonAction
                                onClick={() => clickFunction.aux(item, type)}
                                classBtn={`remove-${type}-dom remove-dom`}
                                icon='close'
                            />
                        </div>
                    )
                }
            </div>
        )
    }
    )
}

CardMini.propTypes = {
    type: PropTypes.string.isRequired,
    model: PropTypes.array.isRequired,
    display: PropTypes.exact({
        type: PropTypes.string.isRequired,
        sideAction: PropTypes.bool
    }).isRequired,
    clickFunction: PropTypes.shape({
        card: PropTypes.func,
        aux: PropTypes.func,
    })
}

export default CardMini