import { useEffect, useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { filterGetModelMap, modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import './ModalList.scss'

const ModalList = (props) => {
    const { updateFilterModel } = useContext(ManageModelContext)
    const type = props.type
    const title = props.title

    const filterGetModel = filterGetModelMap({
        notGoalRelation: 'all',
        type: 'assignment',
        source: 'support'
    }, 'assignment', 'support')


    useEffect(() => {
        updateFilterModel(filterGetModel, 'assignment', 'panel')
    }, [])

    return (
        <div className={`container-list-modal ${type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                <ModelSwitcher type='goal-relation' />
            </div>
        </div>
    )
}

export default ModalList