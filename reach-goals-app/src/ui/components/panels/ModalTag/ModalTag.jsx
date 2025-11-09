import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'

import { targetMap, switchLayoutMap, filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import Tag from '../../items/models/Tag/Tag.jsx'
import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'

import './ModalTag.scss'
import Loading from '../../items/elements/Loading/Loading.jsx'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { setModel, updateFilterModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()
    const { panel: { loading: loadingTag } } = useTagProvider()
    const navigate = useNavigate()

    const isModalForm = ['tag', 'near-modalForm']

    const handleClickConfig = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))
        navigate(`/${layoutComponent.page}`) // return standard route during handle   
    }

    useEffect(() => {
        const filter = filterGetModelMap({
            tagSomeID: 'all', type: 'tag', source: 'core'
        }, 'tag', 'core')

        updateFilterModel(filter, 'tag', 'panel')
    }, [])

    return (
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} standardRoute="true" classBtn='button-action circle close' icon='close' />
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })}
                        classBtn={`button-action create plan max-width ${isModalForm.every(e => visibleElements.includes(e)) ? 'active' : ''}`} icon='plus' title='create' />
                    {/* <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-r-tag', value: false })} classBtn='checkbox-r-tag btn-checkbox'/> */}
                    {/* <ButtonDropdown target={targetMap('btn-filter-tag', { add: true })} classBtn='btn-option-r filter-content' iconFa='fa-solid fa-filter'/> */}
                    {/* Maybe a search bar can be better than a filter button, consider this aproach */}
                    <ButtonAction classBtn='button-action circle max-width config' icon='config' onClick={(e) => handleClickConfig(e)}
                        target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'center' })} />
                </div>
            </div>
            <div className='body scrollable'>
                {
                    isModalForm.every(e => visibleElements.includes(e)) && <ModalForm type='tag' />
                }
                {
                    loadingTag ? <Loading /> : <Tag />
                }
            </div>
        </div>
    )
}

export default ModalTag