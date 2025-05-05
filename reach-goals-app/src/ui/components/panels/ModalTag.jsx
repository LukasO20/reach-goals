import React, { useContext } from 'react'
import { targetMap, checkboxMap } from '../../../utils/mappingUtils'
import { VisibilityContext } from '../../../provider/VisibilityProvider'

import ModalForm from './ModalForm'
import ButtonAction from '../items/elements/ButtonAction'
import ButtonDropdown from '../items/elements/ButtonDropdown'
import ButtonCheckbox from '../items/elements/ButtonCheckbox'

const Tag = () => {
    const { visibleElements } = useContext(VisibilityContext)

    return (
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })} classBtn='form-tag btn-option-r create' iconFa='fa-solid fa-plus' title='create'/>
                    <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-tag', value: false })} classBtn='checkbox-r-tag btn-checkbox'/>
                    <ButtonDropdown target={targetMap('btn-filter-tag', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/>
                    <ButtonAction target={targetMap(['panel-center', 'config'])} classBtn='btn-option-r config-content' iconFa='fa-solid fa-sliders'/>
                </div>
            </div>
            <div className='body'>
                {
                    visibleElements.includes('near-modalForm') && <ModalForm type='tag' />
                }
            </div>
        </div>
    )
}

export default Tag
