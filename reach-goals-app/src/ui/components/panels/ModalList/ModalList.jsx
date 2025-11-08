import { modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import './ModalList.scss'

const ModalList = (props) => {
    const type = props.type
    const title = props.title
    
    return (
        <div className={`container-list-modal ${type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
            </div>
        </div>
    )
}

export default ModalList