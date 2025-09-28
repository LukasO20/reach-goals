import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import { modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import './ModalList.scss'

const ModalList = (props) => {
    const title = props?.title
    const externalFunction = props?.exFunction
    const externalRequestProps = props?.externalRequestProps

    let complement = props?.complement
    if (complement === 'goal') { complement = 'goal-relation' }
    else if (complement === 'assignment') { complement = 'assignment-relation' }

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