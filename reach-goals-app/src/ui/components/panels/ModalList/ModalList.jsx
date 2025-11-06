import { useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import './ModalList.scss'

//Plus props can be used to add extra properties to the component
const plusProps = (props, model, modelUpdateFilter) => {
    if (!model || !modelUpdateFilter) return

    const modelID = model?.mainModelID
    const type = props?.type
    const from = props?.from ?? null

    switch (from) {
        case 'form':
            const isNumberID = typeof modelID === 'number'
            const currentKeySomeID = type === 'goal' ? 'notGoalRelation'
                : type === 'assignment' ?
                    'goalSomeID' : isNumberID ?
                        type === 'goal' ? 'tagNotRelationGoal' : 'tagNotRelationAssignment' :
                        'tagSomeID'

            const filterGetModel = {
                [currentKeySomeID]: 'all',
            }

            // const currentFilter = props?.type === 'goal' ? //Ready to filter assignment without goal
            //     { notGoalRelation: 'all' } : props?.type === 'assignment' ? //Ready to filter all goal
            //         { goalSomeID: 'all' } : isNumberID ? //Ready to filter relation tag or all tag
            //             props?.type === 'goal' ?
            //                 { tagNotRelationGoal: modelID } : { tagNotRelationAssignment: modelID } :
            //             { tagSomeID: 'all' }

            // modelUpdateFilter(filterGetModel, type, 'panel')

            return {
                switcherRelationType: type === 'goal' ? 'goal-relation' : type === 'assignment' ? 'assignment-relation' : 'tag'
            }
    }
}

const ModalList = (props) => {
    const { model, updateFilterModel } = useContext(ManageModelContext)
    const title = props?.title
    const type = plusProps(props, model, updateFilterModel).switcherRelationType
    const externalFunction = props?.exFunction

    return (
        <div className={`container-list-modal ${props.type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                {/* ModelSwitcher here is ready to render a relation Model */}
                {<ModelSwitcher type={type} selectableModel={true} action={{ setForm: true }} exFunction={externalFunction} />}
            </div>
        </div>
    )
}

export default ModalList