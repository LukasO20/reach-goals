import { useNavigate } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../elements/ButtonAction/ButtonAction.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'

import moment from 'moment'

import '../ModalDetailsSection/ModalDetailsSection.scss'

const ModalDetailsSection = (props) => {
    const { model, type } = props
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const handleClickButtonAction = () => {
        navigate(`/${layoutComponent.page}`) // return standard route during handle
    }

    const isValidProps = model && type
    const modelRelationProps = {
        display: { type: 'card-mini' },
        sourceForm: {
            assignments: model.assignments,
            tags: model.tags,
        }
    }

    if (!isValidProps) return null

    return (
        <>
            <div className='header'>
                <h2>{model.name}</h2>
                <h4>{model.end && `Schedule to end on ${moment(model.end).format('MMMM DD')}`}</h4>
                <ButtonAction target={targetMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body'>
                {
                    model.description && (
                        <div className='description'>
                            {model.description}
                        </div>
                    )}
                {
                    type === 'goal' && (
                        <div className='modaldetails assignment-list'>
                            <div className='header-assignment-list'>
                                <h4>{iconMap['assignment']} Assignments</h4>
                            </div>
                            <div className='body-assignment-list'>
                                <Assignment {...modelRelationProps} />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ModalDetailsSection