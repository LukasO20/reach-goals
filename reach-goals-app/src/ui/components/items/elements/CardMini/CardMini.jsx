import { Link } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import './CardMini.scss'

const CardMini = (props) => {
    const { type, model, display, clickFunction } = props
    const { layoutComponent } = useSwitchLayout()

    return model.map(item => {
        const itemID = item.id || item.tagID
        const isTypeTag = type === 'tag'
        const avaiableType = type ?? item.type

        return (
            <div className={`${avaiableType} ${display.type}`} id={itemID} key={itemID}
                onClick={typeof display.type === 'string' && display.type ? (e) => clickFunction.card(item, e) : {}}
                style={isTypeTag ? { backgroundColor: `${item.color}30`, borderColor: item.color } : {}}>
                <Link to={`/${layoutComponent.page}/details`}>
                    <label className='line-info'>
                        {iconMap[avaiableType]}
                        <label>{item.name}</label>
                    </label>
                </Link>
                {
                    display.sideAction && (
                        <div className='side-actions'>
                            <ButtonAction
                                onClick={() => clickFunction.aux(item, avaiableType)}
                                classBtn={`remove-${avaiableType}-dom remove-dom`}
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