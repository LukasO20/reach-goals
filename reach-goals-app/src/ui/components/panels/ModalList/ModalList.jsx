import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import { modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import './ModalList.scss'

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
                <h2>{title}</h2>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='button-action circle close' icon='close'/>
            </div>
            <div className='body scrollable'>
                {<ModelSwitcher type={complement} selectableModel={true} action={{ setForm: true }} propsReference={externalRequestProps} exFunction={externalFunction} />}
            </div>
        </div>
    )
}

export default ModalList