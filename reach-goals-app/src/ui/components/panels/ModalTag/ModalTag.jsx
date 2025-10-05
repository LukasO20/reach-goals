import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, checkboxMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import Tag from '../../items/models/Tag/Tag.jsx'
import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'

import './ModalTag.scss'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { setModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const isModalForm = ['tag', 'near-modalForm']

    const handleClickConfig = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))  
        navigate(`/${layoutComponent.page}`) // return standard route during handle   
    }

    return (
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='button-action circle close' icon='close'/>
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })} classBtn='button-action create plan max-width' icon='plus' title='create'/>
                    {/* <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-tag', value: false })} classBtn='checkbox-r-tag btn-checkbox'/> */}
                    {/* <ButtonDropdown target={targetMap('btn-filter-tag', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/> */}
                    {/* Maybe a search bar can be better than a filter button, consider this aproach */}
                    <ButtonAction classBtn='button-action circle max-width config' icon='config' onClick={(e) => handleClickConfig(e)} 
                        target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'center' })}/>
                </div>
            </div>
            <div className='body'>
                {
                    isModalForm.every(elements => visibleElements.includes(elements)) && <ModalForm type='tag' />
                }
                <Tag tagSomeID={'all'} />
            </div>
        </div>
    )
}

export default ModalTag
