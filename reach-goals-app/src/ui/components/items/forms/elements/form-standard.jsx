import ButtonAction from '../../elements/button-action'
import ButtonDropdown from '../../elements/button-dropdown'
import ModelSwitcher from '../../models/model-switcher'
import ModelCopy from '../../models/model-copy'
import InputDate from '../../elements/input-date'
import InputTimer from '../../elements/input-timer'
import InputText from '../../elements/input-text'

import { useManageModel } from '../../../../../provider/model/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/ui/VisibilityProvider.jsx'

import { cx } from '../../../../../utils/utils.js'

import { ModalModelListWrapper } from '../../../modals/modal-model-list/modal-model-list-wrapper.jsx'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { updateFormModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

/** @typedef {import('../types.js').FormStandardProps} Props */

/**
 * @param {Props} props
 */
const FormStandard = ({ type, functionFormMap, model: modelForm, pendingState }) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { model, setModel, updateFormModel } = useManageModel()

    const modelCopyRegion = type === 'goal' ? 'assignment' : ''
    const icon = iconMap[type] || 'fa-solid fa-triangle-exclamation'
    const isEmptyForm = typeof model.mainModelID === 'number'
    const display = { type: ['card-mini'], actions: ['remove'] }

    const handleClickForm = () => toggleVisibility(visibilityMap('dropdown-status', { remove: true }))

    const renderDropdownStatusTitle = (status) => {
        return {
            icon: status === 'conclude' ? 'check' : status,
            status: status ?? 'choose an option'
        }
    }

    const renderModelEnviroment = (goalForm = false) => {
        const goalEnviroment = !!isEmptyForm && goalForm

        if (goalEnviroment && Object.keys(modelForm).length > 0) return <ModelSwitcher type='assignment' propsReference={modelSwitcherBy} />
        else return <ModelCopy type={model.typeModel} region={modelCopyRegion} propsReference={modelCopyBy} />
    }

    const renderModelTagEnviroment = () => {
        if (!!isEmptyForm && Object.keys(modelForm).length > 0) return <ModelSwitcher type='tag' propsReference={modelSwitcherBy} />
        else return <ModelCopy type={model.typeModel} region='tag' propsReference={modelCopyBy} />
    }

    const dataUpdateFormStatusModel = (value = null) => {
        return updateFormModelMap({ keyObject: 'status', value: value, action: 'add' })
    }

    const dropdownOptionsMap = [
        {
            title: 'in progress',
            icon: 'progress',
            classBtn: modelForm?.status === 'progress' ? 'active' : '',
            onClick: () => { 
                updateFormModel(dataUpdateFormStatusModel('progress')); 
                handleClickForm() 
            }
        },
        {
            title: 'conclude',
            icon: 'check',
            classBtn: modelForm?.status === 'conclude' ? 'active' : '',
            onClick: () => { 
                updateFormModel(dataUpdateFormStatusModel('conclude')); 
                handleClickForm() 
            }
        },
        {
            title: 'cancel',
            icon: 'cancel',
            classBtn: modelForm?.status === 'cancel' ? 'active' : '',
            onClick: () => { 
                updateFormModel(dataUpdateFormStatusModel('cancel')); 
                handleClickForm() 
            }
        },
    ]

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
        tag: !isEmptyForm ? 'tagSomeID' : type === 'goal' ? 'tagNotRelationGoal' : 'tagNotRelationAssignment'
    }
    const modelSwitcherBy = { source: modelForm, display }
    const modelCopyBy = { display }

    const buttonAssignmentClass = cx(
        `op-form-assignment
        plan
        small
        ${type === 'assignment' && 'active'}
        `
    )

    const buttonGoalClass = cx(
        `op-form-goal
        plan
        small
        ${type === 'goal' && 'active'}
        `
    )

    const isGoalForm = type === 'goal'

    return (
        <div className='container-form-modal center-content' onClick={handleClickForm}>
            <div className='head'>
                <div className='objective-icon'>{icon}</div>
                <div className='objective-options'>
                    <div className='objective-op'>
                        <ButtonAction
                            visibility={visibilityMap(['modal-center', 'assignment'], { maintain: true })}
                            classBtn={buttonAssignmentClass}
                            title='assignments'
                            nullForm={true}
                            onClick={() => setModel(prev => ({ ...prev, typeModel: 'assignment' }))}
                        />
                        <ButtonAction 
                            visibility={visibilityMap(['modal-center', 'goal'], { maintain: true })} 
                            classBtn={buttonGoalClass}
                            title='goals' 
                            nullForm={true} 
                            onClick={() => setModel(prev => ({ ...prev, typeModel: 'goal' }))} 
                        />
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
                            type === 'assignment' && (
                                <div className='field-forms duration'>
                                    <label>{iconMap['clock']}<span>duration</span></label>
                                    <InputTimer id={`${type}-duration`} className='input-form input-timer timer' name='duration'
                                        onChange={functionFormMap.mapHandleChange} value={modelForm.duration ?? null} />
                                </div>
                            )
                        }
                        <div className='field-forms status'>
                            <label>{iconMap['progress']}<span>status</span></label>
                            <ButtonDropdown 
                                visibility='dropdown-status'
                                visibilityOperator={{ add: 'dropdown-status' }}
                                classBtn='status form'
                                classBtnAction='plan'
                                icon={renderDropdownStatusTitle(modelForm.status)?.icon}
                                title={renderDropdownStatusTitle(modelForm.status)?.status}
                                options={dropdownOptionsMap}
                                arrow={true}
                            />
                        </div>
                    </div>
                    {functionFormMap.mapModelRelationAddMap('tag', renderModelTagEnviroment())}
                    {functionFormMap.mapModelRelationAddMap(type, renderModelEnviroment(isGoalForm))}
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
                <ModalModelListWrapper title={titlesModalModelList[modalModelListType]}
                    type={modalModelListType} typeFilterKey={filtersKeys[modalModelListType]} />
            }
        </div>
    )
}

export default FormStandard