import { useState } from 'react'

import { useTagProvider } from '../../../provider/model/tag-model-provider/index.jsx'

import { visibilityMap } from '../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../elements/button-action' 
import InputText from '../../elements/input-text' 
import Loading from '../../elements/loading' 
import Icons from '../../elements/icons'

/** @typedef {import('../types.js').FormTagProps} Props */

/**
 * @param {Props} props
 */
const FormTag = ({ type, functionFormMap, model: modelForm, pendingState }) => {
    const { modal: { loading } } = useTagProvider()
    const [color, setColor] = useState('')

    return (
        <div className='container-form-modal near tag'>
            {loading ? (<Loading mode='block' />)
                : (<>
                    <div className='head'>
                        <div className='objective-title'>
                            <h2>
                                <Icons icon='icon-tag' />
                                Tag
                            </h2>
                        </div>
                        <div className='objective-buttons-options'>
                            <ButtonAction classBtn='circle close' icon='icon-close'
                                visibility={visibilityMap('near-modalForm', { remove: true })} />
                        </div>
                    </div>
                    <div className='body'>
                        <form>
                            <div className='fields'>
                                <div className='field-forms name'>
                                    <label>
                                        <Icons icon='icon-rename' />
                                        <span>name</span>
                                    </label>
                                    <InputText
                                        id={`${type}-name`} className='input-form input-text name' placeholder={`${type} name`}
                                        name='name' value={modelForm?.name || ''} onChange={functionFormMap.mapHandleChange} />
                                </div>
                                <div className='field-forms color'>
                                    <label>
                                        <Icons icon='icon-color' />
                                        <span>color</span>
                                    </label>
                                    <div className='field-form-info'>
                                        <input id={`${type}-color`} name='color' type='color' value={modelForm?.color || '#000000'}
                                            style={{ borderColor: `${modelForm?.color || '#000000'}` }}
                                            onChange={(e) => { setColor(e.target.value); functionFormMap.mapHandleChange(e) }} />
                                        <span>{color || modelForm?.color}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='bottom'>
                        <ButtonAction classBtn='plan max-width save' icon='icon-save' title='Save'
                            pendingState={pendingState}
                            onClick={functionFormMap.mapHandleSubmit} />
                    </div>
                </>)}
        </div>
    )
}

export default FormTag