import { useAssignmentProvider } from '../../../../provider/model/assignment-model-provider.jsx'
import { useGoalProvider } from '../../../../provider/model/goal-model-provider.jsx'
import { useManageModel } from '../../../../provider/model/manage-model-provider.jsx'
import { useNavigate } from 'react-router-dom'
import { useVisibility } from '../../../../provider/ui/visibility-provider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider.jsx'

import { iconMap } from '../../../../utils/mapping/mappingIcons.jsx'
import { visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import Loading from '../../items/elements/loading'

import ButtonAction from '../../items/elements/button-action/index.jsx'
import Assignment from '../../items/models/assignment/index.jsx'

import moment from 'moment'

import './style.scss'

const ModalDetails = () => {
    const { modal: { data: dataGoal, loading: loadingGoal } } = useGoalProvider()
    const { modal: { data: dataAssignment, loading: loadingAssignment } } = useAssignmentProvider()
    const { model: { typeModel } } = useManageModel()
    const { data: { layout } } = useSwitchLayout()
    const { visibleElements } = useVisibility()

    const dataModel = typeModel === 'goal' ? dataGoal : dataAssignment

    const isLoading = !!loadingGoal || !!loadingAssignment

    const navigate = useNavigate()
    const typeVisibility = visibleElements[1]

    const handleClickButtonAction = () => navigate(`/${layout.page.pageName}`) // return standard route during handle

    const modelRelationProps = {
        display: {
            type: ['card-mini'],
            actions: []
        },
        source: {
            assignments: dataModel?.assignments ?? [],
            tags: dataModel?.tags ?? [],
        }
    }

    return (
        isLoading ? (<Loading mode='block' />) : (
            <>
                <div className='head'>
                    <h2>{dataModel?.name}</h2>
                    <h4>{dataModel?.end && `Schedule to end on ${moment(dataModel?.end).format('MMMM DD')}`}</h4>
                    <ButtonAction
                        visibility={visibilityMap(null)}
                        onClick={handleClickButtonAction}
                        classBtn='button-action circle close'
                        icon='close'
                    />
                </div>
                <div className='body'>
                    {dataModel?.description && (
                        <div className='description'>
                            {dataModel?.description}
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
    )
}

export default ModalDetails