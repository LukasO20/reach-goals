import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'

import { iconMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../elements/ButtonAction/ButtonAction.jsx'
import Assignment from '../../models/Assignment/Assignment.jsx'

import moment from 'moment'

import '../ModalDetailsSection/ModalDetailsSection.scss'

const ModalDetailsSection = () => {
    const { layout } = useSwitchLayout()
    const { visibleElements } = useContext(VisibilityContext)
    const { model: { formModel } } = useContext(ManageModelContext)

    const navigate = useNavigate()
    const typeVisibility = visibleElements[1]

    const handleClickButtonAction = () => {
        navigate(`/${layout.page.pageName}`) // return standard route during handle
    }

    const modelRelationProps = {
        display: { type: 'card-mini' },
        sourceForm: {
            assignments: formModel.assignments,
            tags: formModel.tags,
        }
    }

    return (
        <>
            <div className='head'>
                <h2>{formModel.name}</h2>
                <h4>{formModel.end && `Schedule to end on ${moment(formModel.end).format('MMMM DD')}`}</h4>
                <ButtonAction visibility={visibilityMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
            </div>
            <div className='body'>
                {
                    formModel.description && (
                        <div className='description'>
                            {formModel.description}
                        </div>
                    )}
                {
                    typeVisibility === 'goal' && (
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