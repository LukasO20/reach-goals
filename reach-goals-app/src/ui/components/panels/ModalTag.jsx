import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider'

import { targetMap, checkboxMap } from '../../../utils/mappingUtils'

import Tag from '../items/models/Tag'
import ModalForm from './ModalForm'
import ButtonAction from '../items/elements/ButtonAction'
import ButtonDropdown from '../items/elements/ButtonDropdown'
import ButtonCheckbox from '../items/elements/ButtonCheckbox'

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
