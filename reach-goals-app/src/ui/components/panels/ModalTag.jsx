import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'

import { targetMap, checkboxMap } from '../../../utils/mappingUtils.js'

import Tag from '../items/models/Tag.jsx'
import ModalForm from './ModalForm.jsx'
import ButtonAction from '../items/elements/ButtonAction.jsx'
import ButtonDropdown from '../items/elements/ButtonDropdown.jsx'
import ButtonCheckbox from '../items/elements/ButtonCheckbox.jsx'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)

    const isModalForm = ['tag', 'near-modalForm']

    return (
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })} classBtn='form-tag btn-option-r create' iconFa='fa-solid fa-plus' title='create' nullModel={true}/>
                    <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-tag', value: false })} classBtn='checkbox-r-tag btn-checkbox'/>
                    <ButtonDropdown target={targetMap('btn-filter-tag', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/>
                    <ButtonAction target={targetMap(['panel-center', 'config'])} classBtn='btn-option-r config-content' iconFa='fa-solid fa-sliders'/>
                </div>
            </div>
            <div className='body'>
                {
                    isModalForm.every(elements => visibleElements.includes(elements)) && <ModalForm type='tag' />
                }
                <Tag tagSomeID={true} />
            </div>
        </div>
    )
}

export default ModalTag
