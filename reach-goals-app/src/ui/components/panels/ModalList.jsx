import ModelSwitcher from '../items/models/ModelSwitcher'
import ButtonAction from '../items/elements/ButtonAction'

import { modalListMap } from '../../../utils/mappingUtils'

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
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                { console.log('MODAL LIST WITOUT MODEL - ', props) }
                {
                    <ModelSwitcher type={complement} selectableModel={true} action={{ setForm: true }} propsReference={externalRequestProps} exFunction={externalFunction} />
                }
            </div>
        </div>
    )
}

export default ModalList