import ButtonAction from '../../elements/ButtonAction.jsx'
import Assignment from '../../models/Assignment.jsx'
import Goal from '../../models/Goal.jsx'

import { targetMap } from '../../../../../utils/mapping/mappingUtils.js'

const switchSectionLayout = (model, type) => {
    switch (type) {
        case 'goal':
            return (
                <>
                    <div className='header'>
                        <h2>{model?.name}</h2>
                        <h4>{model?.end}</h4>
                        <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark' />
                    </div>
                    <div className='body'>
                        {
                            model?.description &&
                            <div>
                                {model.description}
                            </div>
                        }
                        {
                            <div className='modaldetails assignment-list'>
                                <div className='header-assignment-list'>
                                    <i className="icon-st fa-solid fa-list-check"></i>
                                    <h4>Assignments</h4>
                                </div>
                                <div className='body-assignment-list'>
                                    <Assignment assignmentGoalRelation={model?.id} />
                                </div>
                            </div>
                        }
                    </div>
                </>
            )
        case 'assignment':
            return (
                <>
                    <div className='header'>
                        <h2>{model?.name}</h2>
                        <h4>{model?.end}</h4>
                        <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark' />
                    </div>
                    <div className='body'>
                        <div>
                            <Goal />
                        </div>
                        {
                            model?.description &&
                            <div>
                                {model.description}
                            </div>
                        }
                    </div>
                </>
            )
        default:
            return null
    }
}

const ModalDetailsSection = (props) => {
    const model = props?.model
    const type = props?.type

    return (switchSectionLayout(model, type))
}

export default ModalDetailsSection