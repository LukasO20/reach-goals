import { useContext } from 'react'

import ModalList from '../../panels/ModalList.jsx'
import ButtonAction from '../elements/ButtonAction.jsx'
import ButtonDropdown from '../elements/ButtonDropdown.jsx'
import ModelSwitcher from '../models/ModelSwitcher.jsx'
import ModelCopy from '../models/ModelCopy.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { targetMap } from '../../../../utils/mapping/mappingUtils.js'

const iconMap = {
    assignment: 'fa-solid fa-list-check',
    goal: 'fa-solid fa-bullseye'
}

const titleMap = {
    assignment: 'Create your assignment',
    goal: 'Create your goal'
}

const Form = (props) => {
    const typeForm = props?.typeForm
    const functionsForm = props?.functionFormMap
    const modelForm = props?.model
    const booleanForm = props?.booleanFormMap
    const contextForm = props?.contextFormMap
    const stateForm = props?.stateFormMap

    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'
    const titleForm = titleMap[typeForm] || 'Create your objective'

    let modalListRequestProps = {
        notRelationID: modelForm?.id,
        notRelationModel: typeForm,
    }

    if (!modelForm?.id) {
        modalListRequestProps = {
            ...modalListRequestProps,
            notRelationID: false,
            notRelationModel: false,
            tagSomeID: true
        }

        if (typeForm === 'assignment') {
            modalListRequestProps = {
                ...modalListRequestProps,
                goalSomeID: true
            }
        }
    }

    if (typeForm === 'goal') {
        modalListRequestProps = {
            ...modalListRequestProps,
            notGoalRelation: true
        }
    }

    if (typeForm === 'assignment' && modelForm?.id) {
        modalListRequestProps = {
            ...modalListRequestProps,
            notAssignmentRelation: modelForm.id
        }
    }

    const tagRelation = typeForm === 'goal' ? 'goalID' : 'assignmentID';

    const modelSwitcherProps = {
        [tagRelation]: modelForm?.id,
        focused: modelForm,
        assignmentGoalRelation: modelForm.id,
        display: {
            sideAction: true,
            type: 'mini-list'
        },
        modelRef: {
            assignment: modelForm?.assignments,
            tag: modelForm?.tags?.map(tags => tags.tag)
        }
    }

    const { model, setModel } = useContext(ManageModelContext)

    switch (typeForm) {
        case 'tag':
            return (
                <div className='container-form-modal near tag'>
                    <div className='head'>
                        <div className='objective-title'>
                            <label>Create a tag</label>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction target={targetMap('near-modalForm', { remove: true })} classBtn='button-action-p close-modal' iconFa='fa-solid fa-xmark' />
                        </div>
                    </div>
                    <div className='body'>
                        <form>
                            <div className='objective-forms'>
                                <div className='field-forms name'>
                                    <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name here`}
                                        name='name' value={modelForm?.name || ''} onChange={functionsForm.mapHandleChange} />
                                    <input id={`${typeForm}-color`} name='color' type='color' onChange={functionsForm.mapHandleChange} />
                                </div>
                            </div>
                            <div className='bottom-form'>
                                <label onClick={functionsForm.mapHandleSubmit}>save</label>
                            </div>
                            <div className='bottom-form-messagae'>
                                {
                                    stateForm.mapStateSuccess &&
                                    <p className='message successfull'>
                                        <label>Tag save with success!'</label>
                                    </p>
                                }
                                {
                                    stateForm.mapStateError &&
                                    <p className='message error'>
                                        <label>{`Ops, something went wrong: ${stateForm.mapStateError}`}</label>
                                    </p>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )
        default:
            return (
                <div className='container-form-modal center-content' onClick={(e) => { functionsForm.mapHandleModalList(functionsForm.mapModalListMap(false), e); functionsForm.mapToggleVisibility(targetMap(booleanForm.mapClassRemove), e) }}>
                    <div className='head'>
                        <div className='objective-icon'>
                            <i className={`icon-st ${icon}`}></i>
                        </div>
                        <div className='objective-options'>
                            <div className='objective-op'>
                                <ButtonAction target={targetMap(['panel-center', 'assignment'], { maintain: true })} classBtn='op-form-assignment button-op-objective' title='assingments' nullModel={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'assignment' }))}/>
                                <ButtonAction target={targetMap(['panel-center', 'goal'], { maintain: true })} classBtn='op-form-goal button-op-objective' title='goals' nullModel={true} onClick={() => setModel(prev => ({ ...prev, typeModel: 'goal' }))}/>
                            </div>
                            <div className='objective-color'>
                                <label className='color'></label>
                            </div>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction target={targetMap(null)} nullModel={true} classBtn='button-action-p close-modal' iconFa='fa-solid fa-xmark' />
                        </div>
                    </div>
                    <div className='body'>
                        <h2>{titleForm}</h2>
                        <div className='objective-forms'>
                            <form>
                                <div className='field-forms name'>
                                    <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name...`}
                                        name='name' value={modelForm?.name || ''} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms start-date'>
                                    <input id={`${typeForm}-start-date`} className='input-form' type='text' placeholder='set start date'
                                        name='start' value={modelForm?.start || ''} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms end-date'>
                                    <input id={`${typeForm}-end-date`} className='input-form' type='text' placeholder='set end date'
                                        name='end' value={modelForm?.end || ''} onChange={functionsForm.mapHandleChange} />
                                </div>
                                <div className='field-forms status'>
                                    <ButtonDropdown target={targetMap(`${typeForm}-status`, { add: true })} classBtn='dropdown-form' title='choose an option' opening='modal-form' dropdownValue={modelForm?.status || undefined} changeDropdownValue={functionsForm.mapHandleChange} dataSelectable={true} />
                                </div>
                                {functionsForm.mapFormsInputMap(typeForm, modelForm, functionsForm.mapHandleChange)}
                                <div className='item-forms tag'>
                                    <div className='item-forms head'>
                                        <div className='item-head-1'>
                                            <label>tags</label>
                                            <ButtonAction modalList={functionsForm.mapModalListMap(true, 'tag')} classBtn={'form-modallist-tag'} iconFa='fa-solid fa-plus' title='Add' />
                                        </div>
                                        <div className='item-head-2'></div>
                                    </div>
                                    <div className='item-forms body'>
                                        {<ModelSwitcher type={'tag'} propsReference={modelSwitcherProps} />}
                                        {<ModelCopy type={model.typeModel}  />}
                                    </div>
                                </div>
                                {typeForm === 'goal' && functionsForm.mapFormsItemMap(typeForm, <ModelSwitcher type={'goal-relation'} propsReference={modelSwitcherProps} />)}
                                {/* {typeForm === 'assignment' && functionsForm.mapFormsItemMap(typeForm, <ModelSwitcher type={'assignment-relation'} propsReference={modelSwitcherProps} />)} */}
                                <div className='field-forms details'>
                                    <textarea id={`${typeForm}-details`} className='input-form' placeholder='details here...'
                                        name='description' value={modelForm?.description || ''} onChange={functionsForm.mapHandleChange}></textarea>
                                </div>
                                <div className='bottom-form'>
                                    <label onClick={functionsForm.mapHandleSubmit}>save</label>
                                </div>
                                <div className='bottom-form-messagae'>
                                    {
                                        stateForm.mapStateSuccess &&
                                        <p className='message successfull'>
                                            <label>{typeForm === 'goal' ? 'Goal save with success!' : 'Assignment save with success!'}</label>
                                        </p>
                                    }
                                    {
                                        stateForm.mapStateError &&
                                        <p className='message error'>
                                            <label>{`Ops, something went wrong: ${stateForm.mapStateError}`}</label>
                                        </p>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    {
                        contextForm.mapModalList.open && contextForm.mapModalList.type !== 'tag' &&
                        <ModalList title={`Complementing ${typeForm === 'goal' ? 'an assignment' : 'a goal'}`} complement={typeForm} externalRequestProps={modalListRequestProps} exFunction={functionsForm.mapHandleChange} />
                    }
                    {
                        contextForm.mapModalList.open && contextForm.mapModalList.type === 'tag' &&
                        <ModalList title='Complementing a tag' complement='tag' externalRequestProps={modalListRequestProps} exFunction={functionsForm.mapHandleChange} />
                    }
                </div>
            )
    }
}

export default Form