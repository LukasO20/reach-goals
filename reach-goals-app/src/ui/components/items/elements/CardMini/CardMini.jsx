import { Link } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'
import { hasRequiredProps } from '../../../../../utils/utils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import './CardMini.scss'

const CardMini = (props) => {
    const { type, model, display, clickFunction } = props
    const { layoutComponent } = useSwitchLayout()

    const requiredSuccessful = hasRequiredProps(props, ['type', 'model', 'display', 'clickFunction'])
    if (!requiredSuccessful) return null

    return model.map(item => {
        const itemID = item.id || item.tagID
        const isTypeTag = type === 'tag'

        return (
            <div className={`${type} ${display.type}`} id={itemID} key={itemID}
                onClick={typeof display.type === 'string' && display.type ? (e) => clickFunction.card(item, e) : {}}
                style={isTypeTag ? { backgroundColor: `${item.color}30`, borderColor: item.color } : {}}>
                <Link to={`/${layoutComponent.page}/details`}>
                    <label className='line-info'>
                        {iconMap[type]}
                        <label>{item.name}</label>
                    </label>
                </Link>
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