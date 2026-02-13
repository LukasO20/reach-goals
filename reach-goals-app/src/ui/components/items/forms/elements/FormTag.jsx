import { useState } from 'react'

import ButtonAction from '../../elements/ButtonAction/ButtonAction.jsx'
import InputText from '../../elements/InputText/InputText.jsx'
import Loading from '../../elements/Loading/Loading.jsx'

import { visibilityMap, iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import PropTypes from 'prop-types'

import '../Form.scss'
import { useTagProvider } from '../../../../../provider/model/TagModelProvider.jsx'

const FormTag = ({ type, functionFormMap, model: modelForm, pendingState }) => {
    const { modal: { loading } } = useTagProvider()
    const [color, setColor] = useState('')

    return (
        <div className='container-form-modal near tag'>
            {!!loading ? (<Loading mode='block' />)
                : (<>
                    <div className='head'>
                        <div className='objective-title'>
                            <h2>{iconMap['tag']}Tag</h2>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction classBtn='button-action circle close' icon='close'
                                visibility={visibilityMap('near-modalForm', { remove: true })} />
                        </div>
                    </div>
                    <div className='body'>
                        <form>
                            <div className='fields'>
                                <div className='field-forms name'>
                                    <label>{iconMap['editbox']}<span>name</span></label>
                                    <InputText
                                        id={`${type}-name`} className='input-form input-text name' placeholder={`${type} name`}
                                        name='name' value={modelForm?.name || ''} onChange={functionFormMap.mapHandleChange} />
                                </div>
                                <div className='field-forms color'>
                                    <label>{iconMap['color']}<span>color</span></label>
                                    <div className='field-form-info'>
                                        <input id={`${type}-color`} name='color' type='color' value={modelForm?.color || '#000000'}
                                            style={{ borderColor: `${modelForm?.color || '#000000'}` }}
                                            onChange={(e) => { setColor(e.target.value); functionFormMap.mapHandleChange(e) }}/>
                                            <span>{color || modelForm?.color}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='bottom'>
                        <ButtonAction classBtn='button-action plan max-width save' icon='save' title='Save'
                            pendingState={pendingState}
                            onClick={functionFormMap.mapHandleSubmit} />
                    </div>
                </>)}
        </div>
    )
}

FormTag.propTypes = {
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
    pendingState: PropTypes.bool.isRequired
}

export default FormTag