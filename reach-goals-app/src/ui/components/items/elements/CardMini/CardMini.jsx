import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../../utils/utils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import './CardMini.scss'

const CardMini = (props) => {
    const { type, model, display, clickFunction } = props

    const requiredSuccessful = hasRequiredProps(props, ['type', 'model', 'display', 'clickFunction'])
    if (!requiredSuccessful) return null

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

export default CardMini