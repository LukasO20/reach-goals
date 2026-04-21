import { useNavigate } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../../../provider/model/ManageModelProvider.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import ButtonAction from '../../elements/button-action' 
import Assignment from '../../models/assignment'

import moment from 'moment'

import './style.scss'

const ModalDetailsSection = () => {
    const { data: { layout } } = useSwitchLayout()
    const { visibleElements } = useVisibility()
    const { model: { formModel } } = useManageModel()

    const navigate = useNavigate()
    const typeVisibility = visibleElements[1]

    const handleClickButtonAction = () => navigate(`/${layout.page.pageName}`) // return standard route during handle
    
    const modelRelationProps = {
        display: {
            type: ['card-mini'],
            actions: []
        },
        source: {
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
                {formModel.description && (
                    <div className='description'>
                        {formModel.description}
                    </div>
                )}
                {typeVisibility === 'goal' && (
                    <div className='modaldetails assignment-list'>
                        <div className='header-assignment-list'>
                            <h4>{iconMap['assignment']} Assignments</h4>
                        </div>
                        <div className='body-assignment-list'>
                            <Assignment {...modelRelationProps} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ModalDetailsSection