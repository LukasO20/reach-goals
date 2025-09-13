import { useContext } from 'react'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { targetMap, checkboxMap } from '../../../../utils/mapping/mappingUtils.js'

import Tag from '../../items/models/Tag/Tag.jsx'
import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { setModel } = useContext(ManageModelContext)

    const isModalForm = ['tag', 'near-modalForm']

    const configClick = (event) => {
        if (event) setModel(prev => ({ ...prev, typeModel: 'config' }))     
    }

    return (
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='button-action circle close' icon='close'/>
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })} classBtn='form-tag btn-option-r create' icon='plus' title='create'/>
                    <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-tag', value: false })} classBtn='checkbox-r-tag btn-checkbox'/>
                    {/* <ButtonDropdown target={targetMap('btn-filter-tag', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/> */}
                    {/* Maybe a search bar can be better than a filter button, consider this aproach */}
                    <ButtonAction target={targetMap(['panel-center', 'config'])} classBtn='btn-option-r config-content' icon='config' onClick={(e) => configClick(e)}/>
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
