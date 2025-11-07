import { useContext, useEffect } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { modalListMap } from '../../../../utils/mapping/mappingUtils.js'

import ModelSwitcher from '../../items/models/ModelSwitcher.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import './ModalList.scss'

//Plus props can be used to add extra properties to the component
const plusProps = (props, model) => {
    if (!model) return
    const modelType = model?.typeModel
    const modelID = model?.mainModelID
    const type = props?.type
    const from = props?.from ?? null
    let switcherRelation = null
    if (props?.type === 'goal') switcherRelation = 'goal-relation'
    else if (props?.type === 'assignment') switcherRelation = 'assignment-relation'
    else if (props?.type === 'tag') switcherRelation = 'tag'

    switch (from) {
        case 'form':
            const isNumberID = typeof modelID === 'number'
            // const currentKeySomeID = type === 'goal' ? 'notGoalRelation'
            //     : type === 'assignment' ?
            //         'goalSomeID' : isNumberID ?
            //             type === 'goal' ? 'tagNotRelationGoal' : 'tagNotRelationAssignment' :
            //             'tagSomeID'

            const currentFilter = props?.type === 'goal' ? //Ready to filter assignment without goal
                { notGoalRelation: 'all' } : props?.type === 'assignment' ? //Ready to filter all goal
                    { goalSomeID: 'all' } : isNumberID ? //Ready to filter relation tag or all tag
                        modelType === 'goal' ?
                            { tagNotRelationGoal: modelID } : { tagNotRelationAssignment: modelID } :
                        { tagSomeID: 'all' }

            return {
                propsReference: {
                    ...currentFilter,
                    typeDataSource: 'support',
                },
                switcherRelationType: switcherRelation
            }
            // return {
            //     switcherRelationType: type === 'goal' ? 'goal-relation' : type === 'assignment' ? 'assignment-relation' : 'tag'
            // }
    }
}

const ModalList = (props) => {
    const { model, updateFilterModel } = useContext(ManageModelContext)
    const title = props?.title
    // const type = plusProps(props, model).switcherRelationType
    const type = plusProps(props).switcherRelationType
    const propsReference = plusProps(props, model).propsReference
    const externalFunction = props?.exFunction

    //TODO: CHECK IDEA TO USE UpdateFilter TO UPDATE ONLY "scope" attribute and send filter data by propsReference

    useEffect(() => {
        if (typeof type !== 'string') return

        // const modelID = model?.mainModelID
        // const isNumberID = typeof modelID === 'number'

        // const currentKeySomeID = model.typeModel === 'goal' ? 'notGoalRelation'
        //     : model.typeModel === 'assignment' ?
        //         'goalSomeID' : isNumberID ?
        //             model.typeModel === 'goal' ? 'tagNotRelationGoal' : 'tagNotRelationAssignment' :
        //             'tagSomeID'

        // const currentModelFilter = model.typeModel === 'goal' ? 'assignment'
        //     : model.typeModel === 'assignment' ? 
        //         'goal' : isNumberID ? 'tag' : null

        // updateFilterModel({
        //     [currentKeySomeID]: 'all',
        //     source: 'support',
        //     type: currentModelFilter,
        // }, currentModelFilter, 'panel')

    }, [type])

    return (
        <div className={`container-list-modal ${props.type}`}>
            <div className='head'>
                <h2>{title}</h2>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body scrollable'>
                {/* ModelSwitcher here is ready to render a relation Model */}
                {<ModelSwitcher type={type} selectableModel={true} action={{ setForm: true }} propsReference={propsReference} exFunction={externalFunction} />}
            </div>
        </div>
    )
}

export default ModalList