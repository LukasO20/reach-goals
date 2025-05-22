import React from 'react'
import Goal from '../items/models/Goal'
import Assignment from '../items/models/Assignment'
import Tag from '../items/models/Tag'
import ButtonAction from '../items/elements/ButtonAction'

const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

const ModalList = (props) => {
    const title = props?.title
    const complement = props?.complement 
    const externalFunction = props?.exFunction
    const externalID = props?.externalID
    const externalGetNotRelationModel = props?.getNotRelationModel
    const externalGetAllModel = props?.getAllModel

    const typeGet = externalGetNotRelationModel?.notRelationID
        ? { ...externalGetNotRelationModel }
        : { ...externalGetAllModel }

    return (
        <div className={`container-list-modal ${complement}`}>
            <div className='head'>
                <h3>{title}</h3>
                <ButtonAction modalList={modalListMap(false)} standardRoute='true' classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
            </div>
            <div className='body'>
                {
                complement === 'tag' ? <Tag selectableModel={true} action={{ setForm: true }} {...typeGet} exFunction={externalFunction}/> :
                complement === 'goal' ? <Goal selectableModel={true} assignmentRelation={externalID} action={{ setForm: true }} exFunction={externalFunction}/> :
                <Assignment selectableModel={true} action={{ setForm: true }} unfocused={true} exFunction={externalFunction}/>
                }
            </div>
        </div>
    )
}

export default ModalList