import { useContext } from 'react'

import ModalModelList from '../../../modals/ModalModelList/ModalModelList.jsx'
import ButtonAction from '../../elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../elements/ButtonDropdown/ButtonDropdown.jsx'
import ModelSwitcher from '../../models/ModelSwitcher.jsx'
import ModelCopy from '../../models/ModelCopy.jsx'
import InputDate from '../../elements/InputDate/InputDate.jsx'
import InputTimer from '../../elements/InputTimer/InputTimer.jsx'
import InputText from '../../elements/InputText/InputText.jsx'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { visibilityMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import PropTypes from 'prop-types'

import '../Form.scss'

const FormStandard = ({ type, functionFormMap, model: modelForm, booleanFormMap, pendingState }) => {
    const { visibleElements } = useContext(VisibilityContext)
    const { model, setModel } = useContext(ManageModelContext)

    const modelCopyRegion = type === 'goal' ? 'assignment' : ''
    const icon = iconMap[type] || 'fa-solid fa-triangle-exclamation'
    const display = { type: ['card-mini'], actions: ['remove'] }

    const titleDropdownStatus = modelForm.status ?
        <>
            {iconMap[modelForm.status === 'conclude' ? 'check' : modelForm.status]}
            {modelForm.status}
        </>
        : 'choose an option'

    const modalModelShowed = visibleElements.find(classItem => classItem?.includes('modal-model-list')) ?? ''
    const modalModelListType = modalModelShowed.split('-')[3]
    const titlesModalModelList = {
        goal: 'Choose a goal',
        assignment: 'Choose an assignment',
        tag: 'Choose a tag'
    }
    const filtersKeys = {
        goal: 'goalSomeID',
        assignment: 'notGoalRelation',
        tag: 'tagSomeID'
    }
    const modelSwitcherBy = { sourceForm: modelForm, display }
    const modelCopyBy = { display }

    const isGoalForm = type === 'goal'

    return (
        <div className='container-form-modal center-content' onClick={(e) => functionFormMap.mapToggleVisibility(visibilityMap(booleanFormMap.mapClassRemove), e)}>
            <div className='head'>
                <div className='objective-icon'>
                    {icon}
                </div>
                <div className='objective-options'>
                    <div className='objective-op'>
                        <ButtonAction visibility={visibilityMap(['modal-center', 'assignment'], { maintain: true })} classBtn={`op-form-assignment button-action plan small ${type === 'assignment' ? 'active' : ''}`}
                            title='assignments' nullForm={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'assignment' }))} />
                        <ButtonAction visibility={visibilityMap(['modal-center', 'goal'], { maintain: true })} classBtn={`op-form-goal button-action plan small ${type === 'goal' ? 'active' : ''}`}
                            title='goals' nullForm={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'goal' }))} />
                    </div>
                    <div className='objective-color'>
                        <label className='color'></label>
                    </div>
                </div>
                <div className='objective-buttons-options'>
                    <ButtonAction visibility={visibilityMap(null)} nullForm={true} classBtn='button-action circle close' icon='close' />
                </div>
            </div>
            <div className='body'>
                <form className='scrollable'>
                    <div className='fields'>
                        <div className='field-forms name'>
                            <label>{iconMap['editbox']}<span>name</span></label>
                            <InputText
                                id={`${type}-name`} className='input-form input-text name' placeholder={`${type} name`}
                                name='name' value={modelForm?.name || ''} onChange={functionFormMap.mapHandleChange} />
                        </div>
                        <div className='field-forms start-date'>
                            <label>{iconMap['schedule']}<span>start date</span></label>
                            <InputDate id={`${type}-start-date`} className='input-form input-date start' name='start' selected={modelForm?.start} onChange={functionFormMap.mapHandleChange} />
                        </div>
                        <div className='field-forms end-date'>
                            <label>{iconMap['schedule']}<span>end date</span></label>
                            <InputDate id={`${type}-end-date`} className='input-form input-date end' name='end' selected={modelForm?.end} onChange={functionFormMap.mapHandleChange} />
                        </div>
                        {
                            type === 'assignment' &&
                            <div className='field-forms duration'>
                                <label>{iconMap['clock']}<span>duration</span></label>
                                <InputTimer id={`${type}-duration`} className='input-form input-timer timer' name='duration'
                                    onChange={functionFormMap.mapHandleChange} value={modelForm.duration ?? null} />
                            </div>
                        }
                        <div className='field-forms status'>
                            <label>{iconMap['progress']}<span>status</span></label>
                            <ButtonDropdown visibility={visibilityMap(`${type}-status`, { add: true })}
                                classBtn={`button-dropdown-form plan left status ${visibleElements.includes(`${type}-status`) ? 'active' : ''}`}
                                title={titleDropdownStatus} opening='modal-form' arrow={true}
                                dropdownValue={modelForm?.status || undefined} changeDropdownValue={functionFormMap.mapHandleChange} />
                        </div>
                    </div>
                    {
                        functionFormMap.mapModelRelationAddMap('tag',
                            <>
                                {
                                    typeof modelForm.id === 'number' ?
                                        <ModelSwitcher type='tag' propsReference={modelSwitcherBy} />
                                        :
                                        <ModelCopy type={model.typeModel} region='tag' propsReference={modelCopyBy} />
                                }
                            </>
                        )
                    }
                    {
                        functionFormMap.mapModelRelationAddMap(type,
                            <>
                                {
                                    typeof modelForm.id === 'number' && isGoalForm ?
                                        <ModelSwitcher type='assignment' propsReference={modelSwitcherBy} />
                                        :
                                        <ModelCopy type={model.typeModel} region={modelCopyRegion} propsReference={modelCopyBy} />
                                }
                            </>
                        )
                    }
                    <div className='item-forms details'>
                        <div className='head'>
                            <div className='item-head-1'>
                                <label>{iconMap['comment']} <span>comment</span></label>
                            </div>
                        </div>
                        <div className='body'>
                            <textarea id={`${type}-details`} className='input-form scrollable' placeholder='details here...'
                                name='description' value={modelForm?.description || ''} onChange={functionFormMap.mapHandleChange}></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div className='bottom'>
                <ButtonAction pendingState={pendingState} onClick={functionFormMap.mapHandleSubmit} classBtn='button-action plan max-width save' icon='save' title={typeof model.mainModelID === 'number' ? 'Save' : 'Create'} />
            </div>
            {
                !!modalModelShowed &&
                <ModalModelList title={titlesModalModelList[modalModelListType]}
                    type={modalModelListType} typeFilterKey={filtersKeys[modalModelListType]} />
            }
        </div>
    )
}

FormStandard.propTypes = {
    type: PropTypes.string,
    functionFormMap: PropTypes.shape({
        mapToggleVisibility: PropTypes.func,
        mapHandleChange: PropTypes.func,
        mapModelRelationAddMap: PropTypes.func,
        mapHandleSubmit: PropTypes.func,
        mapSetError: PropTypes.func
    }).isRequired,
    model: PropTypes.shape({
        formModel: PropTypes.object
    }).isRequired,
    booleanFormMap: PropTypes.object,
    pendingState: PropTypes.bool.isRequired
}

export default FormStandard