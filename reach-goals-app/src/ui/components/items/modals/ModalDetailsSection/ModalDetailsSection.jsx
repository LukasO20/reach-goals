import { useNavigate } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../elements/ButtonAction/ButtonAction.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'

import moment from 'moment'

import '../ModalDetailsSection/ModalDetailsSection.scss'

const switchSectionLayout = (model, type, handleClickButtonAction) => {
    const renderButtonAction = <ButtonAction target={targetMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
    const modelRelationProps = {
        sourceForm: {
            assignments: model?.assignments,
            tags: model?.tags,
        }
    }

    switch (type) {
        case 'goal':
            return (
                <>
                    <div className='header'>
                        <h2>{model?.name}</h2>
                        <h4>{model?.end && `Schedule to end on ${moment(model.end).format('MMMM DD')}`}</h4>
                        {renderButtonAction}
                    </div>
                    <div className='body'>
                        {
                            model?.description &&
                            <div className='description'>
                                {model.description}
                            </div>
                        }
                        {
                            <div className='modaldetails assignment-list'>
                                <div className='header-assignment-list'>
                                    <h4>{iconMap['assignment']} Assignments</h4>
                                </div>
                                <div className='body-assignment-list'>
                                    <Assignment {...modelRelationProps} />
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
                        <h4>{`Schedule to end on ${model?.end && moment(model.end).format('MMMM DD')}`}</h4>
                        {renderButtonAction}
                    </div>
                    <div className='body'>
                        {
                            model?.description &&
                            <div className='description'>
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
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const model = props?.model
    const type = props?.type

    const handleClickButtonAction = () => {
        navigate(`/${layoutComponent.page}`) // return standard route during handle
    }

    return (switchSectionLayout(model, type, handleClickButtonAction))
}

export default ModalDetailsSection