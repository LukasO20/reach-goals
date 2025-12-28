import { useContext } from 'react'

import ModalList from '../../modals/ModalList/ModalList.jsx'
import ButtonAction from '../elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../elements/ButtonDropdown/ButtonDropdown.jsx'
import ModelSwitcher from '../models/ModelSwitcher.jsx'
import ModelCopy from '../models/ModelCopy.jsx'
import InputDate from '../elements/InputDate/InputDate.jsx'
import InputTimer from '../elements/InputTimer/InputTimer.jsx'
import InputText from '../elements/InputText/InputText.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { targetMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import './Form.scss'

const Form = (props) => {
    const { visibleElements } = useContext(VisibilityContext)
    const { model, setModel } = useContext(ManageModelContext)
    const { pendingState } = props

    const typeForm = props?.typeForm
    const functionsForm = props?.functionFormMap
    const modelForm = props?.model
    const booleanForm = props?.booleanFormMap

    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'

    const modelSwitcherRelation = typeForm === 'goal' ? 'goal-relation' : null
    const modelCopyRelation = typeForm === 'goal' ? 'assignment' : null
    const modelSwitcherProps = {
        sourceForm: modelForm,
        display: {
            sideAction: true,
            type: 'card-mini'
        }
    }

    const titleDropdownStatus = modelForm?.status ?
        <>
            {iconMap[modelForm.status === 'conclude' ? 'check' : modelForm.status]}
            {modelForm.status}
        </>
        : 'choose an option'
        
    const modalListShowed = visibleElements.find(classItem => classItem.includes('modal-list'))
    const modalListType = modalListShowed?.split('-')[2] ?? null
    const modalListTitle = {
        goal: 'Choose a goal',
        assignment: 'Choose an assignment',
        tag: 'Choose a tag'
    }

    switch (typeForm) {
        case 'tag':
            return (
                <div className='container-form-modal near tag'>
                    <div className='head'>
                        <div className='objective-title'>
                            <h2>{iconMap['tag']}Create a tag</h2>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction target={targetMap('near-modalForm', { remove: true })} classBtn='button-action circle close' icon='close' />
                        </div>
                    </div>
                    <div className='body'>
                        <form>
                            <div className='fields'>
                                <div className='field-forms name'>
                                    <label>{iconMap['editbox']}<span>name</span></label>
                                    <InputText
                                        id={`${typeForm}-name`} className='input-form input-text name' placeholder={`${typeForm} name`}
                                        name='name' value={modelForm?.name || ''} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms color'>
                                    <label><span>color</span></label>
                                    <input id={`${typeForm}-color`} name='color' type='color' onChange={functionsForm.mapHandleChange} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='bottom'>
                        <ButtonAction pendingState={pendingState} onClick={functionsForm.mapHandleSubmit} classBtn='button-action plan max-width save' icon='save' title='Save' />
                    </div>
                </div>
            )
        default:
            return (
                <div className='container-form-modal center-content' onClick={(e) => functionsForm.mapToggleVisibility(targetMap(booleanForm.mapClassRemove), e)}>
                    <div className='head'>
                        <div className='objective-icon'>
                            {icon}
                        </div>
                        <div className='objective-options'>
                            <div className='objective-op'>
                                <ButtonAction target={targetMap(['modal-center', 'assignment'], { maintain: true })} classBtn={`op-form-assignment button-action plan small ${typeForm === 'assignment' ? 'active' : ''}`}
                                    title='assignments' nullForm={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'assignment' }))} />
                                <ButtonAction target={targetMap(['modal-center', 'goal'], { maintain: true })} classBtn={`op-form-goal button-action plan small ${typeForm === 'goal' ? 'active' : ''}`}
                                    title='goals' nullForm={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'goal' }))} />
                            </div>
                            <div className='objective-color'>
                                <label className='color'></label>
                            </div>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction target={targetMap(null)} nullForm={true} classBtn='button-action circle close' icon='close' />
                        </div>
                    </div>
                    <div className='body'>
                        <form className='scrollable'>
                            <div className='fields'>
                                <div className='field-forms name'>
                                    <label>{iconMap['editbox']}<span>name</span></label>
                                    <InputText
                                        id={`${typeForm}-name`} className='input-form input-text name' placeholder={`${typeForm} name`}
                                        name='name' value={modelForm?.name || ''} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms start-date'>
                                    <label>{iconMap['schedule']}<span>start date</span></label>
                                    <InputDate id={`${typeForm}-start-date`} className='input-form input-date start' name='start' selected={modelForm?.start} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms end-date'>
                                    <label>{iconMap['schedule']}<span>end date</span></label>
                                    <InputDate id={`${typeForm}-end-date`} className='input-form input-date end' name='end' selected={modelForm?.end} onChange={functionsForm.mapHandleChange} />
                                </div>
                                {
                                    typeForm === 'assignment' &&
                                    <div className='field-forms duration'>
                                        <label>{iconMap['clock']}<span>duration</span></label>
                                        <InputTimer id={`${typeForm}-duration`} className='input-form input-timer timer' name='duration'
                                            onChange={functionsForm.mapHandleChange} value={modelForm.duration ?? null} />
                                    </div>
                                }
                                <div className='field-forms status'>
                                    <label>{iconMap['progress']}<span>status</span></label>
                                    <ButtonDropdown target={targetMap(`${typeForm}-status`, { add: true })}
                                        classBtn={`button-dropdown-form plan left status ${visibleElements.includes(`${typeForm}-status`) ? 'active' : ''}`}
                                        title={titleDropdownStatus} opening='modal-form' arrow={true}
                                        dropdownValue={modelForm?.status || undefined} changeDropdownValue={functionsForm.mapHandleChange} dataSelectable={true} />
                                </div>
                            </div>
                            <div className='item-forms tag'>
                                <div className='head'>
                                    <div className='item-head-1'>
                                        <label>{iconMap['tag']}<span>tags</span></label>
                                        <ButtonAction target={targetMap('modal-list-tag', { add: true })}
                                            classBtn={'button-action plan-round add max-width small'} icon='plus' title='Add' />
                                    </div>
                                    <div className='item-head-2'></div>
                                </div>
                                <div className='body'>
                                    {
                                        <>
                                            {
                                                typeof modelForm.id === 'number' ?
                                                    <ModelSwitcher type={'tag'} propsReference={modelSwitcherProps} />
                                                    :
                                                    <ModelCopy type={model.typeModel} region={'tag'} />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                            {
                                functionsForm.mapModelRelationAddMap(typeForm,
                                    <>
                                        {
                                            typeof modelForm.id === 'number' ?
                                                <ModelSwitcher type={modelSwitcherRelation} propsReference={modelSwitcherProps} />
                                                :
                                                <ModelCopy type={model.typeModel} region={modelCopyRelation} />
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
                                    <textarea id={`${typeForm}-details`} className='input-form scrollable' placeholder='details here...'
                                        name='description' value={modelForm?.description || ''} onChange={functionsForm.mapHandleChange}></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='bottom'>
                        <ButtonAction pendingState={pendingState} onClick={functionsForm.mapHandleSubmit} classBtn='button-action plan max-width save' icon='save' title={typeof model.mainModelID === 'number' ? 'Save' : 'Create'} />
                    </div>
                    { modalListType && <ModalList title={modalListTitle[modalListType]} typeVisibility={modalListType} /> }
                </div>
            )
    }
}

export default Form