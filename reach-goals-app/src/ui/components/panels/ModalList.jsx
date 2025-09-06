import ModelSwitcher from '../items/models/ModelSwitcher.jsx'
import ButtonAction from '../items/elements/ButtonAction.jsx'

import { modalListMap } from '../../../utils/mapping/mappingUtils.js'

const ModalList = (props) => {
    const title = props?.title
    let complement = props?.complement
    const externalFunction = props?.exFunction

    if (complement === 'goal') { complement = 'goal-relation' }
    else if (complement === 'assignment') { complement = 'assignment-relation' }

    const externalRequestProps = props?.externalRequestProps

    return (
        <div className={`container-list-modal ${complement}`}>
            <div className='head'>
                <h3>{title}</h3>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='btn-action-r close-modal circ' icon='close'/>
            </div>
            <div className='body'>
                {
                    <ModelSwitcher type={complement} selectableModel={true} action={{ setForm: true }} propsReference={externalRequestProps} exFunction={externalFunction} />
                }
            </div>
        </div>
    )
}

export default ModalList